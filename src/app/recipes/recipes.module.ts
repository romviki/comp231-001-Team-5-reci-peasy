import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [RecipesComponent, RecipeDetailComponent],
  providers: [],
  exports: [RecipesComponent, RecipeDetailComponent],
})
export class RecipesModule {}
