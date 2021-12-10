import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { OnlineStoreComponent } from './online-store/online-store.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeListComponent } from './admin/recipe-list/recipe-list.component';
import { MerchandiseListComponent } from './admin/merchandise/merchandise-list/merchandise-list.component';
import { AddRecipeComponent } from './admin/add-recipe/add-recipe.component';
import { AddMerchandiseComponent } from './admin/merchandise/add-merchandise/add-merchandise.component';
import { EditMercandiseComponent } from './admin/merchandise/edit-mercandise/edit-mercandise.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent,
  },
  {
    path: 'online-store',
    component: OnlineStoreComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'recipe-list',
    component: RecipeListComponent,
    children: [
      {
        path: 'add',
        component: AddRecipeComponent,
      },
    ],
  },
  {
    path: 'merchandise-list',
    component: MerchandiseListComponent,
    // children: [
    //   {
    //     path: 'add',
    //     component: AddMerchandiseComponent,
    //   },
    // ],
  },
  {
    path: 'merchandise-list/add',
    component: AddMerchandiseComponent,
  },
  {
    path: 'merchandise-list/edit',
    component: EditMercandiseComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
