import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { userAction } from 'app/actions';
import { authenticationAction } from 'app/modules/authentication/state';
import { UserState } from 'app/modules/user/state/reducer/users.reducer';
import { map } from 'rxjs';

@Injectable()
export class HydratationEffects implements OnInitEffects {

  $hydratation = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.hydrate),
      map(() => {
        const storageValue = localStorage.getItem('loggedIn');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return authenticationAction.loginSuccess(state)
          } catch (error) {
            console.error(error);
          }
        }
        return userAction.hydrateFailure();
      })
    ));

  constructor(private actions$: Actions, private store: Store<UserState>) { }

  ngrxOnInitEffects(): Action {
    return userAction.hydrate();
  }

}
