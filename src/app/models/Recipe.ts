export interface Recipe {
  id: string;
  metaData: {
    name: string;
    img: string;
    description: string;
    viewed: number;
  };
  recipeDetails: {
    ingredients: Ingredients[],
    instructions: string,
    cookingTime: string,
    servingPortion: string,
    dietaryInformation: string
  }
}

export interface Ingredients {
  name: string,
  amount: number,
  unit: string
}

export type RecommendedRecipe = { id: string } & Recipe['metaData'];
export type RecipeDetail = { id: string } & Recipe['metaData'] & Recipe['recipeDetails'];
export type RecipeItem = { id: string } & Recipe['metaData'];
