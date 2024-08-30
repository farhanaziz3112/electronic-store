import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions<any>,
    private authService: AuthService
  ) {}

  userChange$ = createEffect(() =>
    this.authService.user$.pipe(
      map((userDetails: any) =>
        UserActions.userChangedFromAuth0SDK({ userDetails: userDetails })
      )
    )
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.allNavBarActions.loginFlowInitiated.type),
        tap(() => this.authService.loginWithRedirect({
            appState: {
                target: '/dashboard'
            }
        }))
      ),
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.allNavBarActions.logoutFlowInitiated.type),
        tap(() => this.authService.logout())
      ),
    {
      dispatch: false,
    }
  );
}
