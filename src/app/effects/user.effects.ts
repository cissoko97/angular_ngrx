import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { userAction } from "app/actions";
import { UserService } from "app/service/user/user.service";
import { catchError, EMPTY, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.getUserApi.type),
    mergeMap(() => of(users)
      .pipe(
        map(
          users => {
            return userAction.loadUserFromService({ users })
          }
        ),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}

const users = [
  {
    uuid: `MAX1`,
    name: 'Steve',
    phone: '699552612',
    surname: 'Cissoko Boris'
  },
  {
    uuid: `MAX2`,
    name: 'Lyonnel',
    phone: '699552612',
    surname: 'Cissoko Boris'
  }, {
    uuid: `MAX3`,
    name: 'Jordane',
    phone: '699552612',
    surname: 'Cissoko Boris'
  }, {
    uuid: `MAX4`,
    name: 'el',
    phone: '699552612',
    surname: 'Cissoko Boris'
  }
];
