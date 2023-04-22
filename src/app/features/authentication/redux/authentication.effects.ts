import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "app/core/services/user/user.service";
import { catchError, exhaustMap, lastValueFrom, map, of, tap } from "rxjs";
import { AuthAction } from './authentication.action';
import { AuthenticationService } from "app/core/services/authentication/authentication.service";

@Injectable()
export class AuthenticationEffects {

  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.login),
    exhaustMap(action => this.authenticationService
      .login(action)
      .pipe(
        map(data => AuthAction.loginSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken })),
        catchError(error => of(AuthAction.loginFailed()))
      )
    )
  ));

  userRegister$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.register),
    exhaustMap(action => this.userService
      .login({ login: action.user.name, password: action.user.surname })
      .pipe(
        map(data => AuthAction.loginSuccess({ accessToken: '', refreshToken: '' })),
        catchError(error => of(AuthAction.loginFailed()))
      )
    )
  ));

  userLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginSuccess),
    tap(data => this.router.navigate(['user']))
  ), { dispatch: false });
}
