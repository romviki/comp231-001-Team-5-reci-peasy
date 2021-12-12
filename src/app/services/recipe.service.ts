import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { FirestoreError } from 'firebase/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Recipe, RecommendedRecipe } from './../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private angularFireStore: AngularFirestore) {}

  getRecommendedRecipes(): Observable<RecommendedRecipe[]> {
    const recipes$ = this.getRecipes$((ref) =>
      ref.orderBy('metaData.viewed').limit(10)
    );
    return recipes$.pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            id: recipe.id,
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
    const recipe$ = this.getRecipeCollection().doc(recipeId).get();
    return recipe$.pipe(
      map((res) => res.data()),
      catchError((err: FirestoreError) => throwError(err.message)),
      take(1)
    );
  }

  getRecipes() {
    return this.getRecipes$((ref) => ref.limit(50));
  }

  private getRecipeCollection(queryCallBack?: QueryFn | undefined) {
    return this.angularFireStore.collection<Recipe>('recipes', queryCallBack);
  }

  private getRecipes$(queryCallBack?: QueryFn | undefined) {
    const recipesCollection = this.getRecipeCollection(queryCallBack);
    return recipesCollection.valueChanges({ idField: 'id' }).pipe(take(1));
  }
}
