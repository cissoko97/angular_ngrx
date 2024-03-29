import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/features/authentication/redux';
import { getIsLoggedIn } from 'app/features/authentication/redux/authentication.selectors';
import { Observable, tap } from 'rxjs';

@Injectable()
export class NoAuthGuard implements CanActivate {

  store = inject(Store) as Store<AuthState>;
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(getIsLoggedIn)
      .pipe(
        tap((loggedIn) => {
          if (loggedIn) {
            this.router.navigate(['user'])
          }
        })
      );
  }

}
