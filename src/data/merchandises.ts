import { Merchandise } from 'src/app/models/Merchandise';

export const merchandises: Merchandise[] = [
  {
    name: 'Vinegar',
    price: 1.5,
    unit: 'ml',
    volume: 500,
    stock: 100,
  },
  {
    name: 'Eggs',
    price: 2.67,
    unit: 'pieces',
    volume: 12,
    stock: 100,
    allergens: ['eggs'],
  },
  {
    name: 'Fish sauce',
    price: 2.5,
    unit: 'L',
    volume: 1,
    stock: 100,
    allergens: ['seafood'],
  },
  {
    price: 5.0,
    unit: 'ml',
    volume: 750,
    stock: 100,
    name: 'Olive Oil',
  },
  {
    name: 'Tomato Paste',
    price: 1.5,
    unit: 'ml',
    volume: 500,
    stock: 100,
    allergens: ['gluten'],
  },
  {
    name: 'Soy sauce',
    price: 1.5,
    unit: 'L',
    volume: 1,
    stock: 100,
    allergens: ['nuts'],
  },
  {
    name: 'Soy milk',
    price: 3.5,
    unit: 'L',
    volume: 1.5,
    stock: 100,
    allergens: ['nuts'],
  },
];
