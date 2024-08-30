import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { allNavBarActions, selectIsLoggedIn, selectUserDetails } from '../../state/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  authenticated$: Observable<boolean> | any;
  user$: Observable<any> | any;

  constructor(public auth: AuthService, private store: Store<any>) {
    this.authenticated$ = this.store.select(selectIsLoggedIn);
    this.user$ = this.store.select(selectUserDetails);
  }

  logout() {
    this.store.dispatch(allNavBarActions.logoutFlowInitiated());
  }
}
