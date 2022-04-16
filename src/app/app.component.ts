import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { userAction } from './actions';
import { IUser } from './models/user.model';
import { UserState } from './reducer/users.reducer';
import { userSelector } from './selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() title = 'tutoriel ngrx';
  count = 0;
  users$: Observable<UserState> = this.store.select(userSelector.selectUsers);

  subscription: Subscription = new Subscription();
  users: Array<IUser> = [];
  constructor(private store: Store<UserState>, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  remove(userID: string): void {
    this.count--;
    this.store.dispatch(userAction.remove({ userID, size: this.count }));
  }

  add(): void {
    let data: IUser = {
      uuid: `MAX${++this.count}`,
      name: 'Cissoko',
      phone: '699552612',
      surname: 'Cissoko Boris'
    };
    this.store.dispatch(userAction.add({ user: data, size: this.count }));
  }

  update(user: IUser): void {
    let data: IUser = {
      uuid: user.uuid,
      name: 'Cissoko',
      phone: '699552612',
      surname: 'Kombou yvan'
    };
    this.store.dispatch(userAction.update({ userID: data.uuid, user: data }));
  }

  clear(): void {
    this.store.dispatch(userAction.clear());
  }

  loadData(): void {
    this.count = 0;
    this.users = [
      {
        uuid: `MAX${++this.count}`,
        name: 'Steve',
        phone: '699552612',
        surname: 'Cissoko Boris'
      },
      {
        uuid: `MAX${++this.count}`,
        name: 'Lyonnel',
        phone: '699552612',
        surname: 'Cissoko Boris'
      }, {
        uuid: `MAX${++this.count}`,
        name: 'Jordane',
        phone: '699552612',
        surname: 'Cissoko Boris'
      }, {
        uuid: `MAX${++this.count}`,
        name: 'el',
        phone: '699552612',
        surname: 'Cissoko Boris'
      }
    ];
    this.store.dispatch(userAction.getUserApi({ users: this.users }))
  }

  trackByUSer(index: number, item: IUser): string {
    return item.uuid;
  }

  selectItem(item: IUser): void {
    this.store.dispatch(userAction.selectedUser({ user: item }));
  }

  resetSelection() {
    this.store.dispatch(userAction.selectedUser({}))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
