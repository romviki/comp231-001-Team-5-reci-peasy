import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm: FormGroup;
  unitOptions: string[] = [
    'Piece(s)',
    'Slice(s)',
    'Liter(s)',
    'Milliliter(s)',
    'Gram(s)',
    'Kilogram(s)',
  ];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addRecipeForm = this.fb.group({
      metaData: this.fb.group({
        name: [''],
        img: [''],
        description: [''],
        viewed: [''],
      }),
      recipeDetails: this.fb.group({
        instructions: [''],
        cookingTime: [''],
        servingPortion: [''],
        dietaryInformation: [''],
        //Create Ingredients Form Group
        ingredients: this.fb.array(
          [this.addIngredientsFormGroup()],
          Validators.required
        ),
      }),
    });
  }

  ngOnInit() {}

  get ingredients(): FormArray {
    return this.addRecipeForm.get('recipeDetails.ingredients') as FormArray;
  }

  addIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      amount: [''],
      unit: [''],
    });
  }

  addIngredients() {
    this.ingredients.push(this.addIngredientsFormGroup());
  }

  onSubmit(): void {
    const newRecipe: Recipe = {
      metaData: this.addRecipeForm.value.metaData,
      recipeDetails: this.addRecipeForm.value.recipeDetails,
    };
    this.recipeService.createRecipe(newRecipe).then((_) => {
      this.router.navigateByUrl('/recipe-list');
    });
  }
}
