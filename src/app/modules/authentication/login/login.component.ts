import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NgForm, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from 'app/models';
import { Observable } from 'rxjs';
import { AuthAction } from '../state/authentication.action';
import { getIsLoggedIn, getLoggedUser } from '../state/authentication.selectors';
import { AuthState } from '../state/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formBuilder = inject(NonNullableFormBuilder);
  httpClient = inject(HttpClient);
  authStore = inject(Store) as Store<AuthState>;
  router = inject(Router);

  mouseOverLogin = false;
  login = '';
  password = '';


  selectIsLoggedIn$: Observable<boolean> = this.authStore.select(getIsLoggedIn);
  selectLoggedUser$: Observable<Partial<IUser>> = this.authStore.select(getLoggedUser) as Observable<Partial<IUser>>;

  onLogIn(): void {
    // const formValue = this.loginForm.value;
  }

  onLogOut(): void {
    this.authStore.dispatch(AuthAction.logOut())
  }



  ngOnInit(): void {
  }

  submitForm(formValue: any): void {
    const form: NgForm = new NgForm([], []);
    this.authStore.dispatch(AuthAction.login({ ...formValue }))
  }

  cancel(): void {
    this.authStore.dispatch(AuthAction.logOut())
  }

  mouseEvent(event: Event, status: boolean): void {
    event.preventDefault();
    this.mouseOverLogin = status;
  }
}
