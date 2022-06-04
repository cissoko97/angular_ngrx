import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "app/service/user/user.service";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import * as  authenticationAction from './authentication.action';

@Injectable()
export class AuthenticationEffects {

  userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(authenticationAction.login),
    exhaustMap(action => this.userService
      .login({ login: action.login, password: action.password })
      .pipe(
        map(data => authenticationAction.loginSuccess({ login: action.login, password: action.password })),
        catchError(error => of(authenticationAction.loginFailed()))
      )
    )
  ));

  userRegister$ = createEffect(() => this.actions$.pipe(
    ofType(authenticationAction.register),
    exhaustMap(action => this.userService
      .login({ login: action.user.name, password: action.user.surname })
      .pipe(
        map(data => authenticationAction.loginSuccess({ login: '', password: '' })),
        catchError(error => of(authenticationAction.loginFailed()))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }

}
