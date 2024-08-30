import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { AUTH_FEATURE_KEY } from '../state/authstate/auth.reducer';
import { Login, Logout } from '../state/authstate/auth.actions';
import { Observable } from 'rxjs';
import { authQuery } from '../state/authstate/auth.selectors';
import { UserModel } from '../user.model';
import {
  allNavBarActions,
  selectIsLoggedIn,
  selectUserDetails,
} from '../state/user';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MenubarModule,
    RippleModule,
    InputTextModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    SplitterModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  title = 'ES Admin Portal';
  authenticated$: Observable<boolean> | any;
  user$: Observable<any> | any;

  items: MenuItem[] | undefined;

  constructor(public auth: AuthService, private store: Store<any>) {
    // this.store
    //   .select((state) => state[AUTH_FEATURE_KEY].authenticated)
    //   .subscribe((auth) => {
    //     this.authenticated$ = this.auth.isAuthenticated$;
    //   });
    // this.store
    //   .select(authQuery.getAuthenticated)
    //   .subscribe((auth) => {
    //     this.authenticated$ = this.auth.isAuthenticated$;
    //   });
    //this.authenticated$ = auth.isAuthenticated$;
    this.authenticated$ = this.store.select(selectIsLoggedIn);
    this.user$ = this.store.select(selectUserDetails);
  }

  ngOnInit(): void {
    this.authenticated$.subscribe((x: boolean) => {
      if (x) {
        console.log('authenticated');
      }
    });
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Sales',
        icon: 'pi pi-chart-bar',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
          {
            separator: true,
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
                badge: '2',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
                badge: '3',
              },
            ],
          },
        ],
      },
    ];
  }

  login() {
    // this.auth.loginWithRedirect({
    //   appState: {
    //     target: '/home',
    //   },
    // });
    this.store.dispatch(allNavBarActions.loginFlowInitiated());
  }

  logout() {
    // this.auth.logout();
    this.store.dispatch(allNavBarActions.logoutFlowInitiated());
  }
}
