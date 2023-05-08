import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "app/core/services/user/user.service";
import { catchError, exhaustMap, lastValueFrom, map, of, tap } from "rxjs";
import { AuthAction } from './authentication.action';
import { AuthenticationService } from "app/core/services/authentication/authentication.service";
import { keyWord } from "app/core/utils/storeKey";
import { LocalService } from "app/shared/services/local/local.service";

@Injectable()
export class AuthenticationEffects {

  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private localService = inject(LocalService);

  userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.login),
    exhaustMap(action => this.authenticationService
      .login(action)
      .pipe(
        map(data => {
          this.localService.saveData(keyWord.USERLOGIN, JSON.stringify({ ...data }));
          return AuthAction.loginSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken })
        }),
        catchError(error => {
          console.log(error);
          return of(AuthAction.loginFailed())
        }
        ))
    )
  ) );

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

  userLogOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.logOut),
    exhaustMap(action => {
      this.localService.removeData(keyWord.USERLOGIN);
      this.router.navigate(['login'])
      return of(AuthAction.logOutSuccess())
    }
    )
  ));

  userLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginSuccess),
    tap(data => this.router.navigate(['user']))
  ), { dispatch: false, useEffectsErrorHandler: true });
}
