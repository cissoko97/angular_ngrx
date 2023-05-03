import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as userAction from 'app/core/redux';
import { AuthAction } from 'app/features/authentication/redux';
import { keyWord } from 'app/core/utils/storeKey';
import { map } from 'rxjs';
import { LocalService } from 'app/shared/services/local/local.service';

@Injectable()
export class HydratationEffects implements OnInitEffects {

  localService: LocalService = inject(LocalService);
  $hydratation = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.hydratation.init),
      map(() => {
        const storageValue = this.localService.getData(keyWord.USERLOGIN);
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return AuthAction.loginSuccess({ ...state })
          } catch (error) {
            console.error(error);
          }
        }
        return userAction.hydratation.failure();
      })
    ));

  constructor(private actions$: Actions) { }

  ngrxOnInitEffects(): Action {
    return userAction.hydratation.init();
  }

}
