import { Recipe } from './../models/Recipe';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesCollection: AngularFirestoreCollection<Recipe>;
  recipes$: Observable<Recipe[]>;

  constructor(private angularFireStore: AngularFirestore) {
    this.recipesCollection =
      this.angularFireStore.collection<Recipe>('recipes');
    this.recipes$ = this.recipesCollection.valueChanges();
  }

  getRecommendedRecipes(): Observable<Recipe[]> {
    const recommendedRecipes$ = this.recipes$.pipe();
    return recommendedRecipes$;
  }
}
