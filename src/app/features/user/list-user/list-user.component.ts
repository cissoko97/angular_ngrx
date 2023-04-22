import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { IUser } from 'app/core/models/user.model';
import { BehaviorSubject, Observable, tap, noop, of, from } from 'rxjs';
import { AddUserComponent } from '../add-user/add-user.component';
import { userActions, UserState, selectAllUsers, selectInProggress, selectUserById, selectCurrentUser, selectUserTotal } from '../redux';
import { AuthState } from 'app/features/authentication/redux';
import { getAccesToken , getRefreshToken } from 'app/features/authentication/redux/authentication.selectors';

@Component({
  selector: '[app-list-user]',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUserComponent implements OnInit {

  authStore = inject(Store) as Store<AuthState>;

  selectAccesToken$: Observable<string> = this.authStore.select(getAccesToken)  as Observable<string>;
  selectRefreshToken$: Observable<string> = this.authStore.select(getRefreshToken) as Observable<string>;
  store = inject(Store) as Store<UserState>;
  dialog = inject(MatDialog);
  cdr = inject(ChangeDetectorRef);
  count = 0;
  toget: BehaviorSubject<number> = new BehaviorSubject(this.count);
  users$: Observable<IUser[]> = this.store.pipe(select(selectAllUsers));
  inProgress$: Observable<boolean> = this.store.pipe(select(selectInProggress)) as Observable<boolean>;
  selectedUser$: Observable<IUser> = this.store.pipe(select(selectCurrentUser)) as Observable<IUser>;
  selectLength$: Observable<number> = this.store.pipe(select(selectUserTotal)) as Observable<number>;
  errorMessages$: Observable<string> = of('Bonjour le monde de la programmation');

  ngOnInit(): void {
    this.store.dispatch(userActions.loadUser());
    this.toget.pipe(
      tap((data) => this.selectedUser$ = this.store.pipe(select(selectUserById({ uuid: `MAX${data}` }))) as Observable<IUser>)
    ).subscribe(noop);

    this.selectLength$.pipe(
      tap(data => this.count = data)
    ).subscribe(noop);
  }

  public trackByUser(index: number, user: IUser): string {
    return user.uuid;
  }

  reset(): void {
    this.store.dispatch(userActions.resetUserList());
  }

  selectItem(user: IUser) {
    // this.store.dispatch()
  }

  public addRecord(user?: IUser) {
    /* this.toget.next(++this.count);
    let data: IUser = {
      uuid: `MAX${this.count}`,
      name: 'Cissoko',
      phone: '699552612',
      surname: 'Cissoko Boris',
      experiance: 'Senior',
      sexe: 'M'
    };
    this.store.dispatch(userActions.addUser({ user: data })) */

    const dialog = this.dialog.open(AddUserComponent, {
      width: '250px'
    }).afterClosed().subscribe(data => {
      console.log(data);
    })

  }
}
