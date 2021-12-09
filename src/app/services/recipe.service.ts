import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, map, shareReplay, take, tap } from 'rxjs/operators';
import { Recipe, RecipeDetail, RecommendedRecipe } from './../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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

  getRecommendedRecipes(): Observable<RecommendedRecipe[]> {
    return this.recipes$.pipe(
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

  getRecipeById(recipeId: string): Observable<RecipeDetail | undefined> {
    return this.recipesCollection
      .doc(recipeId)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((recipe) => {
          if(recipe === undefined) return undefined

          return {
            id: recipe.id,
            name: recipe.metaData.name,
            description: recipe.metaData.description,
            img: recipe.metaData.img,
            viewed: recipe.metaData.viewed,
            ingredients: recipe.recipeDetails.ingredients,
            instructions: recipe.recipeDetails.instructions,
            cookingTime: recipe.recipeDetails.cookingTime,
            servingPortion: recipe.recipeDetails.servingPortion,
            dietaryInformation: recipe.recipeDetails.dietaryInformation
          }
        })
      );
  }
}
