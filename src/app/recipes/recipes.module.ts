import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';

@NgModule({
  imports: [],
  declarations: [RecipesComponent, RecipeDetailComponent],
  providers: [],
  exports: [RecipesComponent, RecipeDetailComponent],
})
export class RecipesModule {}
