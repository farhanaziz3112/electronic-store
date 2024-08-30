import { Action, createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { initialState, productsState } from './products.state';

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.fetchProductSuccess, (state, { products }) => ({
    ...state,
    products: products,
  })),
  on(ProductsActions.addProductSuccess, (state, { product }) => {
    const updatedProducts = [...state.products, product];
    console.log(updatedProducts);
    console.log(updatedProducts.length);
    console.log(product);
    return {
      ...state,
      products: updatedProducts,
    };
  }),
  on(ProductsActions.editProductSuccess, (state, { product }) => {
    const productIndex = state.products.findIndex(
      (x) => product._id === x._id
    );
    const updatedProducts = [...state.products];
    updatedProducts[productIndex] = product;
    return {
      ...state,
      products: updatedProducts,
    };
  }),
  on(ProductsActions.deleteProductSuccess, (state, { productId }) => {
    const productIndex = state.products.findIndex(
      (product) => product._id === productId
    );
    const updatedProducts = [...state.products];
    updatedProducts.splice(productIndex, 1);
    return {
      ...state,
      products: updatedProducts,
    };
  })
);

export function reducer(state: productsState | undefined, action: Action) {
  return productsReducer(state, action);
}
