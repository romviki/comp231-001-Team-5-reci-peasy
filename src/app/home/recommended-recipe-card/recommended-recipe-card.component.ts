import { Component, Input, OnInit } from '@angular/core';
import { RecommendedRecipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-recommended-recipe-card',
  templateUrl: './recommended-recipe-card.component.html',
  styleUrls: ['./recommended-recipe-card.component.scss'],
})
export class RecommendedRecipeCardComponent implements OnInit {
  @Input() recommendedRecipe?: RecommendedRecipe;

  constructor() {}

  ngOnInit() {}
}
