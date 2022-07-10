import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "app/service/user/user.service";
import { catchError, exhaustMap, lastValueFrom, map, of, tap } from "rxjs";
import {AuthAction} from './authentication.action';

@Injectable()
export class AuthenticationEffects {

  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private router = inject(Router);

  userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.login),
    exhaustMap(action => this.userService
      .login({ login: action.login, password: action.password })
      .pipe(
        map(data => AuthAction.loginSuccess({ login: action.login, password: action.password })),
        catchError(error => of(AuthAction.loginFailed()))
      )
    )
  ));

  userRegister$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.register),
    exhaustMap(action => this.userService
      .login({ login: action.user.name, password: action.user.surname })
      .pipe(
        map(data => AuthAction.loginSuccess({ login: '', password: '' })),
        catchError(error => of(AuthAction.loginFailed()))
      )
    )
  ));

  userLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginSuccess),
    tap(data => this.router.navigate(['user']))
  ), { dispatch: false });
}
