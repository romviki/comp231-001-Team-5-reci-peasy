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

  public addIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      amount: [''],
      unit: [''],
    });
  }

  get ingredients(): FormArray {
    return <FormArray>this.addRecipeForm.get('recipeDetails.ingredients');
  }

  addIngredients() {
    this.ingredients.push(this.addIngredientsFormGroup());
  }

  public addRecipe(): void {
    var newRecipe = {
      metaData: this.addRecipeForm.value.metaData,
      recipeDetails: this.addRecipeForm.value.recipeDetails,
    } as unknown as Recipe;

    this.recipeService.createRecipe(newRecipe).subscribe((result) => {
      this.router.navigateByUrl('/recipe-list');
    });
  }

  onSubmit(): void {
    console.log(this.addRecipeForm);
  }
}
