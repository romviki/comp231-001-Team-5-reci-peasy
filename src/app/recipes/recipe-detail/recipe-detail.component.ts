import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RecipeService } from './../../services/recipe.service';
import { ActivatedRoute } from "@angular/router";
import { Recipe } from 'src/app/models/Recipe';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe$!: Observable<Recipe | undefined>;
  error$?: Observable<string>;


  constructor(
    public loadingService: LoadingService,
    public recipeService: RecipeService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipe$ = this.loadingService.showLoaderUntilCompleted(this.route.params.pipe(
      switchMap(params => this.recipeService.getRecipeById(params.id)),
      catchError(err => this.error$ = of(err)),
      tap(recipe => console.log(recipe)),
      take(1)
      ));
  }
}
