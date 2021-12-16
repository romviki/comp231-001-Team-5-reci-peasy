import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMerchandiseModule } from './merchandise/admin-merchandise.module';
import { AdminRecipeModule } from './admin-recipe/admin-recipe.module';

@NgModule({
  imports: [CommonModule, AdminMerchandiseModule, AdminRecipeModule],
  declarations: [],
  exports: [],
})
export class AdminModule {}
