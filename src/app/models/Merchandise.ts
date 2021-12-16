export interface Merchandise {
  id?: string;
  name: string;
  price: number;
  unit: Unit;
  volume: number;
  stock: number;
  allergens?: Allergen[];
}

export type Unit = 'g' | 'kg' | 'ml' | 'L' | 'counts';

export type Allergen = 'gluten' | 'dairy' | 'nuts' | 'seafood' | 'eggs';
