import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeItem } from 'src/app/models/Recipe';
import { ManagerService } from '../../../services/manager.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$?: Observable<RecipeItem[]>;

  constructor(public managerService: ManagerService, private router: Router) {}

  ngOnInit() {
    this.recipes$ = this.managerService.getRecipes();
  }

  public editRecipe(recipeId: string): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: recipeId,
      },
    };
    this.router.navigate(['recipe-list/edit'], navigationExtras);
  }

  public deleteRecipe(recipeId: string): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: recipeId,
      },
    };
    console.log('Delete->', recipeId);
    this.managerService.deleteRecipe(recipeId);
    this.recipes$ = this.managerService.getRecipes();
    this.router.navigate(['/recipe-list'], navigationExtras);
  }
}
