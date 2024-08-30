import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'purchase',
        component: PurchaseComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];
