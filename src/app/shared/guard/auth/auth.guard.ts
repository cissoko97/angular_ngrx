import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { containRoles } from 'app/core/utils/hasRole';
import { AuthState } from 'app/features/authentication/redux';
import { getAccesToken } from 'app/features/authentication/redux/authentication.selectors';
import { Observable, map } from 'rxjs';

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
          return containRoles(token, routeRoles);
        })
      );
  }

}


