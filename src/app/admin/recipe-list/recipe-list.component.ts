import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { RecommendedRecipe, RecipeItem } from 'src/app/models/Recipe';
import { LoadingService } from 'src/app/services/loading.service';
import { ManagerService } from './../../services/manager.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$?: Observable<RecipeItem[]>;

  constructor(
    public managerService: ManagerService,
    public loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipes$ = this.loadingService.showLoaderUntilCompleted(
      this.managerService.getRecipes()
    );
  }

  public editRecipe(recipeId: string): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: recipeId
      }
    }
    this.router.navigate(['recipe-list/edit'], navigationExtras);
  };

  public deleteRecipe(recipeId: string): void {

    const navigationExtras: NavigationExtras = {
      state: {
        id: recipeId
      }
    }
    console.log("Delete->", recipeId);
    this.managerService.deleteRecipe(recipeId);
    this.recipes$ = this.loadingService.showLoaderUntilCompleted(
      this.managerService.getRecipes()
    );
    this.router.navigate(['/recipe-list'], navigationExtras);
  };
}
