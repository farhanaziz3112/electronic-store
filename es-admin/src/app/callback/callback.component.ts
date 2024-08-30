import { Component, OnInit } from '@angular/core';
import { AuthState } from '../state/authstate/auth.reducer';
import { Store } from '@ngrx/store';
import { HandleLoginCallback } from '../state/authstate/auth.actions';



@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit{

  constructor(private store: Store<AuthState>) {

  }

  ngOnInit(): void {
      this.store.dispatch(new HandleLoginCallback())
  }

}
