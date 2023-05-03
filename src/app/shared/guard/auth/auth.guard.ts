import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/features/authentication/redux';
import { getAccesToken, getIsLoggedIn } from 'app/features/authentication/redux/authentication.selectors';
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  store = inject(Store) as Store<AuthState>;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const routeRoles: Array<string> = route.data['roles'];

    return this.store.select(getAccesToken)
      .pipe(
        map((token: string) => {
          const dehash = atob(token?.split('.')[1]) as string;

          const claim: { roles: Array<string> } = JSON.parse(dehash);

          return claim.roles.some(role => routeRoles.includes(role));
        })
      );
  }

}
