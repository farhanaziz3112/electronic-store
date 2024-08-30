import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { allNavBarActions, selectUserDetails } from '../../state/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  user$: Observable<any> | any;

  constructor(private auth: AuthService, private store: Store<any>) {
    this.user$ = this.store.select(selectUserDetails);
  }

  login() {
    this.store.dispatch(allNavBarActions.loginFlowInitiated());
  }
}
