import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { Store } from '@ngrx/store';
import { RegisterApp } from './state/authstate/auth.actions';
import { environment } from './environment/environment';
import { appLoaded } from './state/products';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private store: Store<any>) {
    // this.store.dispatch(
    //   new RegisterApp({
    //     clientId: environment.auth.clientId,
    //     domain: environment.auth.domain,
    //     callbackUrl: environment.auth.callbackUrl,
    //   })
    // );
    console.log('dispatch apploaded');
    this.store.dispatch(appLoaded());
  }

  title = 'es-admin';
}
