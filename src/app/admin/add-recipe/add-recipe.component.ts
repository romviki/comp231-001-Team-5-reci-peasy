import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';
import { LoadingService } from 'src/app/services/loading.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm: FormGroup;
  unitOptions: string[] = [
    'Piece(s)',
    'Slice(s)',
    'Liter(s)',
    'Milliliter(s)',
    'Gram(s)',
    'Kilogram(s)'
  ]

  constructor(
    private recipeService: RecipeService,
    private loadingService: LoadingService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addRecipeForm = this.fb.group({
      metaData: this.fb.group({
        name: [''],
        img: [''],
        description: [''],
        viewed: ['']
      }),
      recipeDetails: this.fb.group({
        instructions: [''],
        cookingTime: [''],
        servingPortion: [''],
        dietaryInformation: [''],
        //Create Ingredients Form Group
        ingredients: this.fb.array([
          this.addIngredientsFormGroup()
        ],Validators.required)
      })   
    });
  }

  ngOnInit() {
  }

  public addIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      amount: [''],
      unit: ['']
    })
  }

  get ingredients():FormArray{
    return <FormArray> this.addRecipeForm.get('recipeDetails.ingredients');
  }

  addIngredients() {
    this.ingredients.push(this.addIngredientsFormGroup());
  }

  //public addIngredients(): void {
  //  (<FormArray>this.addRecipeForm.get('ingredients')).push(this.addIngredientsFormGroup());
  //}

  // test
  //getControls() {
  //  return (this.addRecipeForm.get('controlName') as FormArray).controls
  //}

  public addRecipe(): void {
    // bind to Recipe Model
    var newRecipe = {
      //name: this.addRecipeForm.value.name,
      //img: this.addRecipeForm.value.img,
      //description: this.addRecipeForm.value.description,
      //viewed: this.addRecipeForm.value.viewed,
      metaData: this.addRecipeForm.value.metaData,
      recipeDetails: this.addRecipeForm.value.recipeDetails
      //ingredients: this.addRecipeForm.value.ingredients,
      //instructions: this.addRecipeForm.value.instructions,
      //cookingTime: this.addRecipeForm.value.cookingTime,
      //servingPortion: this.addRecipeForm.value.servingPortion,
      //dietaryInformation: this.addRecipeForm.value.dietaryInformation
    } as unknown as Recipe;

    console.log('addRecipeForm -> ', newRecipe);

    this.recipeService.createRecipe(newRecipe)
    .subscribe(
      (result) => {
        console.log("add result", result);
        this.router.navigateByUrl('/recipe-list');
      }
    );
  }

  onSubmit(): void {
    console.log(this.addRecipeForm);
  }

}
