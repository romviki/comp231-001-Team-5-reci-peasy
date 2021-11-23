import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { RecommendedRecipe } from 'src/app/models/Recipe';
import { LoadingService } from 'src/app/services/loading.service';
import { RecipeService } from './../../services/recipe.service';

@Component({
  selector: 'app-recommended-recipe-container',
  templateUrl: './recommended-recipe-container.component.html',
  styleUrls: ['./recommended-recipe-container.component.scss'],
})
export class RecommendedRecipeContainerComponent implements OnInit {
  recommendedRecipes$?: Observable<RecommendedRecipe[]>;

  constructor(
    public recipeService: RecipeService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.recommendedRecipes$ = this.loadingService.showLoaderUntilCompleted(
      this.recipeService.getRecommendedRecipes()
    );
  }
}
