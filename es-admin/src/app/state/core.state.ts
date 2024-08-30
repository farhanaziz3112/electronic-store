import { productsState } from './products';
import { UserState } from './user';

export interface State {
  products: productsState;
  user: UserState
}
