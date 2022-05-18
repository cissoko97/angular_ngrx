import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "app/service/user/user.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { authenticationAction } from "../actions";

@Injectable()
export class AuthenticationLoginEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(authenticationAction.login),
    exhaustMap(action => this.userService
      .login({ login: action.login, password: action.password })
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

@Injectable()
export class AuthenticationRegisterEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
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
