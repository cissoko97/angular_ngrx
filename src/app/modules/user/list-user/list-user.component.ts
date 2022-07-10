import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUser } from 'app/models/user.model';
import { BehaviorSubject, Observable, tap, noop, delay, debounceTime } from 'rxjs';
import { userAction, UserState } from '../state';
import { selectAllUsers, selectInProggress, selectUserById, selectCurrentUser } from '../state/user.selector';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUserComponent implements OnInit {

  store = inject(Store) as Store<UserState>;
  cdr = inject(ChangeDetectorRef);
  count = 4;
  toget: BehaviorSubject<number> = new BehaviorSubject(this.count);
  users$: Observable<IUser[]> = this.store.pipe(delay(1000), select(selectAllUsers));
  inProgress$: Observable<boolean> = this.store.select(selectInProggress);
  selectedUser$: Observable<IUser> = this.store.pipe(select(selectCurrentUser)) as Observable<IUser>;

  ngOnInit(): void {
    this.store.dispatch(userAction.loadUser())
    this.toget.pipe(
      debounceTime(1000),
      tap((data) => this.selectedUser$ = this.store.pipe(select(selectUserById({ uuid: `MAX${data}` }))) as Observable<IUser>)
    ).subscribe(noop);
  }

  trackByUser(index: number, user: IUser): string {

    console.log(`${index}`);

    return user.uuid;
  }

  reset(): void {
    this.store.dispatch(userAction.resetUserList());
  }

  selectItem(user: IUser) {
    // this.store.dispatch()
  }

  addRecord(user?: IUser) {
    this.toget.next(++this.count);
    let data: IUser = {
      uuid: `MAX${this.count}`,
      name: 'Cissoko',
      phone: '699552612',
      surname: 'Cissoko Boris',
      experiance: 'Senior',
      sexe: 'M'
    };
    this.store.dispatch(userAction.addUser({ user: data }))
  }
}
