import { RecommendedRecipeCardComponent } from './recommended-recipe-card/recommended-recipe-card.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RecommendedRecipeContainerComponent } from './recommended-recipe-container/recommended-recipe-container.component';
import { RecipeService } from '../services/recipe.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HomeComponent,
    RecommendedRecipeContainerComponent,
    RecommendedRecipeCardComponent,
  ],
  providers: [RecipeService],
  exports: [HomeComponent],
})
export class HomeModule {}
