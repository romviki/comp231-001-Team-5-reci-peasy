import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Recipe, RecommendedRecipe } from './../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesCollection: AngularFirestoreCollection<Recipe>;
  recipes$: Observable<Recipe[]>;

  constructor(private angularFireStore: AngularFirestore) {
    this.recipesCollection =
      this.angularFireStore.collection<Recipe>('recipes');
    this.recipes$ = this.recipesCollection.valueChanges({ idField: 'id' });
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
      }),
      shareReplay()
    );
  }
}
