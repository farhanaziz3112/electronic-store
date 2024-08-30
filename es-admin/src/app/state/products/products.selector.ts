import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { productsState } from './products.state';

export const selectProducts = createFeatureSelector<productsState>('products');

export const selectProduct = createSelector(
  selectProducts,
  (state: productsState) => state.products
);

export const selectProductItem = (props: { id: string }) =>
  createSelector(selectProduct, (products) =>
    products.find((product) => product['_id'] === props.id)
  );


