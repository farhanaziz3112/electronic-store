import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { SalesComponent } from './pages/sales/sales.component';
import { authGuard } from './auth.guard';
import { logoutGuard } from './logout.guard';
import { AddproductComponent } from './pages/addproduct/addproduct.component';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { AppLayoutComponent } from './layout/app.layout/app.layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [logoutGuard],
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products/addproduct',
        component: AddproductComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products/:id',
        component: ViewproductComponent,
        canActivate: [authGuard],
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  // {
  //     path: 'home',
  //     component: HomeComponent,
  //     canActivate: [authGuard]
  // },
  // {
  //     path: 'sales',
  //     component: SalesComponent,
  //     canActivate: [authGuard]
  // },
];
