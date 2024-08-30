import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import * as productsReducer from './products/products.reducer';
import * as userReducer from './user/user.reducer';

export const reducers: ActionReducerMap<State> = {
  products: productsReducer.reducer,
  user: userReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
