import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { userAction } from 'app/actions';
import { IUser } from 'app/models';
import { UserState } from 'app/reducer/users.reducer';
import { userSelector } from 'app/selectors';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<UserState> {

  users!: Array<IUser>;
  private count: number = 0;

  constructor(private store: Store<{ users: Array<IUser> }>) {


    console.log(`Dans le resolver`);

    this.store.dispatch(userAction.getUserApi({ users: this.users }));
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserState> {

    return this.store.select(userSelector.selectUsers);
  }
}
