import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  ExtraOptions,
  InMemoryScrollingOptions,
  InMemoryScrollingFeature,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from './environment/environment';

import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers, metaReducers } from './state';
import { AuthEffects } from './state/authstate/auth.effects';
import { authReducer } from './state/authstate/auth.reducer';
import * as auth from './state/authstate/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { ProductsEffects } from './state/products';
import { UserEffects } from './state/user';
import { MessageService } from 'primeng/api';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideAnimationsAsync(),
    provideAuth0({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/callback',
      },
    }),
    MessageService,
    //provideStore(authReducer),
    // provideStore(reducers, { metaReducers }),
    //rovideEffects(AuthEffects),
    //provideState(auth.AUTH_FEATURE_KEY, auth.authReducer),
    provideStore(),
    provideStoreDevtools(),
    provideHttpClient(),
    provideStore(reducers, { metaReducers }),
    provideEffects(ProductsEffects, UserEffects),
  ],
};
