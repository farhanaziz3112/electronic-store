import { createAction, props } from '@ngrx/store';
import { Product } from '../../model/product.model';

export const appLoaded = createAction('[App] App Loaded');

export const fetchProductSuccess = createAction(
  '[Product API] Fetch Product Success',
  props<{ products: Product[] }>()
);

export const fetchProductFailed = createAction(
  '[Product API] Fetch Product Failed',
  props<{ error: any }>()
);

export const addProductFormSubmitted = createAction(
  '[Add Product Page] Add Product Form Submitted',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Product API] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailed = createAction(
  '[Product API] Add Product Failed',
  props<{ error: any }>()
);

export const editProductFormSubmitted = createAction(
  '[Edit Product Page] Edit Product Form Submitted',
  props<{ product: Product }>()
);

export const editProductSuccess = createAction(
  '[Product API] Edit Product Success',
  props<{ product: Product }>()
);

export const editProductFailed = createAction(
  '[Product API] Edit Product Failed',
  props<{ error: any }>()
);

export const deleteProductInitiated = createAction(
  '[Delete Product Page] Delete Product Initiated',
  props<{ productId: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ productId: string }>()
);

export const deleteProductFailed = createAction(
  '[Product API] Delete Product Failed',
  props<{ error: any }>()
);
