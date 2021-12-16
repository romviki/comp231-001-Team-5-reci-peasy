import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from './../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe$!: Observable<Recipe | undefined>;
  error$?: Observable<string>;

  constructor(
    public recipeService: RecipeService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipe$ = this.route.params.pipe(
      switchMap((params) => this.recipeService.getRecipeById(params.id)),
      catchError((err) => (this.error$ = of(err)))
    );
  }
}
