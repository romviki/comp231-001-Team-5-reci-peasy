import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { RecipeDetail } from 'src/app/models/Recipe';
import { LoadingService } from 'src/app/services/loading.service';
import { RecipeService } from './../../services/recipe.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipeDetail?: RecipeDetail;
  private routeSub?: Subscription;

  constructor(
    public loadingService: LoadingService,
    public recipeService: RecipeService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.recipeService.getRecipeById(id).subscribe(res => {
        this.recipeDetail = res;
      })
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
