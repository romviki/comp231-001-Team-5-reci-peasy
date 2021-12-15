import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { AddRecipeComponent } from '../admin/add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [RecipesComponent, RecipeDetailComponent, AddRecipeComponent],
  providers: [],
  exports: [RecipesComponent, RecipeDetailComponent, AddRecipeComponent],
})
export class RecipesModule {}
