import { Ingredient } from './../ingredient';

export class Cake {
    id: number;
    name: string;
    price: number;
    final_price: number;
    quantity: number;
    ingredients: Ingredient[];
}

