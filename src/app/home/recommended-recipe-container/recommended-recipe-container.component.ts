import { Observable } from 'rxjs';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { RecommendedRecipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-recommended-recipe-container',
  templateUrl: './recommended-recipe-container.component.html',
  styleUrls: ['./recommended-recipe-container.component.scss'],
})
export class RecommendedRecipeContainerComponent implements OnInit {
  recommendedRecipes$?: Observable<RecommendedRecipe[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recommendedRecipes$ = this.recipeService.getRecommendedRecipes();
  }
}
