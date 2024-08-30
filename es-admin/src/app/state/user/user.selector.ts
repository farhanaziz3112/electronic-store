import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { environment } from '../../environment/environment';

export const USER_ROLES = {
  MENU_ADMIN: 'menu_admin',
};

export const selectUser = createFeatureSelector<UserState>('user');

export const selectUserDetails = createSelector(
  selectUser,
  (state: UserState) => state.userDetails
);

export const selectIsLoggedIn = createSelector(
  selectUserDetails,
  (userDetails: any) => !!userDetails
);

export const selectUserRoles = createSelector(
  selectUserDetails,
  (userDetails: any) => userDetails[`${environment.auth}/roles`]
);

export const selectIsAdmin = createSelector(selectUserRoles, (userRoles) =>
  userRoles?.includes(USER_ROLES.MENU_ADMIN)
);
