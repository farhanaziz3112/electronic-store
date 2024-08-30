/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { bindNodeCallback, of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthPartialState, AUTH_FEATURE_KEY, AuthState } from './auth.reducer';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  AuthActionTypes,
  HandleLoginCallback,
} from './auth.actions';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  onAuthSuccessUrl = '/';
  onAuthFailureUrl = '/';

  // login$ = createEffect(() =>
  //   this.dataPersistence.fetch(AuthActionTypes.Login, {
  //     run: (action: Login, state: AuthPartialState) => {
  //       state[AUTH_FEATURE_KEY].auth.authorize();
  //     },
  //     onError: (err) => {
  //       console.error(err);
  //       console.log('hehehehehe');
  //     },
  //   })
  // );

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(login)
  //   )
  // );

  // handleLoginCallBack$ = createEffect(() =>
  //   this.actions$
  // );

  // handleLoginCallback$ = createEffect(() =>
  //   this.dataPersistence.fetch(AuthActionTypes.HandleLoginCallback, {
  //     run: (action: HandleLoginCallback, state: AuthPartialState) => {
  //       return this.loginObservable$(state).pipe(
  //         map((token) => {
  //           this.router.navigate([this.onAuthSuccessUrl]);
  //           return new LoginSuccess();
  //         }),
  //         catchError(() => {
  //           return of(new LoginFailure());
  //         })
  //       );
  //     },
  //     onError: () => {},
  //   })
  // );

  // logout$ = createEffect(() =>
  //   this.dataPersistence.fetch(AuthActionTypes.Logout, {
  //     run: () => {
  //       localStorage.removeproduct('access_token');
  //       localStorage.removeproduct('exp');
  //       this.router.navigate(['home']);
  //     },
  //     onError: () => {},
  //   })
  // );

  constructor(
    private router: Router,
    private actions$: Actions,
    //private dataPersistence: DataPersistence<AuthPartialState>,
    private store: Store<AuthState>
  ) {}
  parseHash$ = (state: any) =>
    bindNodeCallback(
      state[AUTH_FEATURE_KEY].auth.parseHash.bind(state[AUTH_FEATURE_KEY].auth)
    );

  loginObservable$ = (state: AuthPartialState) =>
    Observable.create((observer: { next: () => void; error: (arg0: any) => void; }) => {
      if (window.location.hash && !state[AUTH_FEATURE_KEY].authenticated) {
        this.parseHash$(state)().subscribe({
          next: (authResult: any) => {
            localStorage.setItem('access_token', authResult.idToken);
            localStorage.setItem('exp', authResult.idTokenPayload.exp);
            observer.next();
          },
          error: (err) => {
            console.error('Error', err);
            observer.error(err);
          },
        });
      }
    });
}
