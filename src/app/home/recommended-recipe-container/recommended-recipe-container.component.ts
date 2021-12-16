import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { RecommendedRecipe } from 'src/app/models/Recipe';
import { RecipeService } from './../../services/recipe.service';

@Component({
  selector: 'app-recommended-recipe-container',
  templateUrl: './recommended-recipe-container.component.html',
  styleUrls: ['./recommended-recipe-container.component.scss'],
})
export class RecommendedRecipeContainerComponent implements OnInit {
  recommendedRecipes$?: Observable<RecommendedRecipe[]>;

  constructor(public recipeService: RecipeService) {}

  ngOnInit() {
    this.recommendedRecipes$ = this.recipeService.getRecommendedRecipes();
  }
}
