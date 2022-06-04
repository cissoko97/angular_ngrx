import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { getIsLoggedIn } from 'app/modules/authentication/state/authentication.selectors';
import { AuthState } from 'app/modules/authentication/state/model';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AuthState>, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    // this.store.select(selectAuthState).pipe
    return this.store.select(getIsLoggedIn)
      .pipe(
        tap((loggedIn) => {
          if (!loggedIn) {
            this.router.navigate(['authentication'])
          }
        })
      );
  }

}
