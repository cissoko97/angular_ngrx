import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IUser } from "app/models";
import { EMPTY, catchError, map, mergeMap, of } from "rxjs";
import { userAction } from ".";

@Injectable()
export class UserEffects {

  actions$ = inject(Actions);
  // userService = inject(UserService);

  loadUserSucces$ = createEffect(() => this.actions$.pipe(
    ofType(userAction.loadUser),
    mergeMap(() => of(users)
      .pipe(
        map(users => userAction.loadUserSuccess({ users })),
        catchError(() => EMPTY)
      ))
  ));

}

const users: IUser[] = [
  {
    uuid: `MAX1`,
    name: 'Steve',
    phone: '699552612',
    surname: 'Cissoko Boris',
    experiance: 'Senior',
    sexe: 'M'
  },
  {
    uuid: `MAX2`,
    name: 'Lyonnel',
    phone: '699552612',
    surname: 'Cissoko Boris',
    experiance: 'Senior',
    sexe: 'M'
  }, {
    uuid: `MAX3`,
    name: 'Jordane',
    phone: '699552612',
    surname: 'Cissoko Boris',
    experiance: 'Senior',
    sexe: 'M'
  }, {
    uuid: `MAX4`,
    name: 'el',
    phone: '699552612',
    surname: 'Cissoko Boris',
    experiance: 'Senior',
    sexe: 'M'
  }
];
