import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as userAction from 'app/core/redux';
import { } from 'app/core/redux';
import { AuthAction } from 'app/features/authentication/redux';
import { UserState } from 'app/features/user/redux/users.reducer';
import { keyWord } from 'app/core/utils/storeKey';
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
