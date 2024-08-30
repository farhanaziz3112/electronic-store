import { Product } from "../../model/product.model";

export interface productsState {
  products: Product[];
}

export const initialState: productsState = {
  products: [],
};
