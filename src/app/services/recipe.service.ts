import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { FirestoreError } from 'firebase/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, take } from 'rxjs/operators';
import { Recipe, RecommendedRecipe } from './../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  collectionName = 'recipes';
  collectionWithoutQuery: AngularFirestoreCollection<Recipe>;
  valueChangesWithoutQuery$: Observable<Recipe[]>;

  constructor(private angularFireStore: AngularFirestore) {
    this.collectionWithoutQuery = this.getCollection();
    this.valueChangesWithoutQuery$ = this.collectionWithoutQuery
      .valueChanges({ idField: 'id' })
      .pipe(shareReplay());
  }

  getRecommendedRecipes(): Observable<RecommendedRecipe[]> {
    const recipes$ = this.getValueChanges$((ref) =>
      ref.orderBy('metaData.viewed').limit(10)
    );
    return recipes$.pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            id: recipe.id!,
            name: recipe.metaData.name,
            description: recipe.metaData.description,
            img: recipe.metaData.img,
            viewed: recipe.metaData.viewed,
          };
        });
      })
    );
  }

  getRecipeById(recipeId: string) {
    const recipe$ = this.getCollection().doc(recipeId).get();
    return recipe$.pipe(
      map((res) => res.data()),
      catchError((err: FirestoreError) => throwError(err.message)),
      take(1)
    );
  }

  getRecipes() {
    return this.getValueChanges$((ref) => ref.limit(50));
  }

  createRecipe(newRecipe: Recipe): Promise<DocumentReference<Recipe>> {
    return this.angularFireStore.collection<Recipe>('recipes').add(newRecipe);
  }

  getCollection(
    queryCallBack?: QueryFn<firebase.firestore.DocumentData>
  ): AngularFirestoreCollection<Recipe> {
    return this.angularFireStore.collection<Recipe>(
      this.collectionName,
      queryCallBack
    );
  }

  getValueChanges$(
    queryCallBack?: QueryFn<firebase.firestore.DocumentData>
  ): Observable<Recipe[]> {
    const recipesCollection = this.getCollection(queryCallBack);
    return recipesCollection.valueChanges({ idField: 'id' }).pipe(take(1));
  }
}
