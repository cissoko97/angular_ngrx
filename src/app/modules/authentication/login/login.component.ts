import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IUser } from 'app/models';
import { Observable } from 'rxjs';
import * as AuthActions from '../state/authentication.action';
import { getIsLoggedIn, getLoggedUser } from '../state/authentication.selectors';
import { AuthState } from '../state/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  selectIsLoggedIn$: Observable<boolean> = this.authStore.select(getIsLoggedIn);
  selectLoggedUser$: Observable<Partial<IUser>> = this.authStore.select(getLoggedUser) as Observable<Partial<IUser>>;

  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authStore: Store<AuthState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [{ value: 'boris', disabled: false }, [Validators.required]],
      password: [{ value: 'Mercedes', disabled: false }, [Validators.required]],
    })
  }


  onLogIn(): void {
    const formValue = this.loginForm.value;
    this.authStore.dispatch(AuthActions.login({ ...formValue }))
  }

  onLogOut(): void {
    this.authStore.dispatch(AuthActions.logOut())
  }

}
