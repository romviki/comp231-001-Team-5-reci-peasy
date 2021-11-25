export interface Recipe {
  id: string;
  metaData: {
    name: string;
    img: string;
    description: string;
    viewed: number;
  };
}

export type RecommendedRecipe = { id: string } & Recipe['metaData'];
