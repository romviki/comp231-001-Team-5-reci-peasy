import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Recipe, RecommendedRecipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private recipesCollection: AngularFirestoreCollection<Recipe>;
  recipes$: Observable<Recipe[]>;

  constructor(private angularFireStore: AngularFirestore) {
    this.recipesCollection = this.angularFireStore.collection<Recipe>(
      'recipes',
      (ref) => ref.limit(10)
    );
    this.recipes$ = this.recipesCollection
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  getRecipes(): Observable<RecommendedRecipe[]> {
    return this.recipes$.pipe(
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

  deleteRecipe(recipeId: string): Observable<any> {
    console.log('Deleted recipe: ' + recipeId);
    return of(
      this.angularFireStore.collection('recipes').doc(recipeId).delete()
    );
  }
}
