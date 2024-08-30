import { createAction, props } from '@ngrx/store';
import { User as Auth0User } from '@auth0/auth0-angular';

export const allNavBarActions = {
  loginFlowInitiated: createAction('[Navbar] Login Flow Initiated'),
  logoutFlowInitiated: createAction('[Navbar] Logout Flow Initiated'),
};

export const userChangedFromAuth0SDK = createAction(
  '[Auth0 SDK] User Changed',
  props<{ userDetails: Auth0User }>()
);
