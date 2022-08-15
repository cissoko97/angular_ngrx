import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { userAction } from 'app/actions';
import { AuthAction } from 'app/modules/authentication/state/authentication.action';
import { UserState } from 'app/modules/user/state/users.reducer';
import { keyWord } from 'app/utils/storeKey';
import { map } from 'rxjs';

@Injectable()
export class HydratationEffects implements OnInitEffects {

  $hydratation = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.hydratation.init),
      map(() => {
        const storageValue = localStorage.getItem(keyWord.USERLOGIN);
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return AuthAction.loginSuccess(state)
          } catch (error) {
            console.error(error);
          }
        }
        return userAction.hydratation.failure();
      })
    ));

  constructor(private actions$: Actions, private store: Store<UserState>) { }

  ngrxOnInitEffects(): Action {
    return userAction.hydratation.init();
  }

}
