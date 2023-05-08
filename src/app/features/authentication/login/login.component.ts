import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NgForm, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthRequest, IUser } from 'app/core/models';
import { Observable } from 'rxjs';
import { AuthState } from '../redux';
import { AuthAction } from '../redux/authentication.action';
import { getAccesToken, getIsLoggedIn, getLoggedUser, getRefreshToken } from '../redux/authentication.selectors';

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

  selectAccesToken$: Observable<string> = this.authStore.select(getAccesToken) as Observable<string>;
  selectRefreshToken$: Observable<string> = this.authStore.select(getRefreshToken) as Observable<string>;

  onLogOut(): void {
    this.authStore.dispatch(AuthAction.logOut())
  }



  ngOnInit(): void {
  }

  submitForm(formValue: any): void {

    console.log(formValue);
    const payload: AuthRequest = {
      username: formValue?.login,
      password: formValue?.password,
      withRefreshToken: false,
      grantType: 'password',
    }

    this.authStore.dispatch(AuthAction.login(payload));
  }

  cancel(form: NgForm): void {
    form.reset()
  }

  mouseEvent(event: Event, status: boolean): void {
    event.preventDefault();
    this.mouseOverLogin = status;
  }
}
