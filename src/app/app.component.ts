import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IUser } from './core/models/user.model';
import { AuthAction, AuthState } from './features/authentication/redux';
import { getIsLoggedIn, getLoggedUser } from './features/authentication/redux/authentication.selectors';
import { ERole } from './core/enum';
import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  todos = signal([{ title: 'Learn signals', done: false }]);
  public eRole = ERole;
  private authStore: Store<AuthState> = inject(Store);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);


  @Input() title = 'tutoriel ngrx';
  count = 0;
  test = signal(0);

  selectIsLoggedIn$: Observable<boolean> = this.authStore.select(getIsLoggedIn);
  selectLoggedUser$: Observable<Partial<IUser>> = this.authStore.select(getLoggedUser) as Observable<Partial<IUser>>;

  subscription: Subscription = new Subscription();
  users: Array<IUser> = [];

  ngOnInit(): void {
    setTheme('bs5');
    this.todos.mutate(value => {
      value[0].done = true;
    })

    this.test.mutate(val => val = val + 3);
    // this.store.dispatch(userAction.getUserApi())
  }

  remove(userID: string): void {
    this.count--;
    // this.store.dispatch(userAction.remove({ userID }));
  }

  add(): void {
    let data: IUser = {
      uuid: `MAX${++this.count}`,
      name: 'Cissoko',
      phone: '699552612',
      surname: 'Cissoko Boris',
      experiance: 'Senior',
      sexe: 'M'
    };
    // this.store.dispatch(userAction.add({ user: data, size: this.count }));
  }

  update(user: IUser): void {
    let data: IUser = {
      uuid: user.uuid,
      name: 'Cissoko',
      phone: '699552612',
      surname: 'Kombou yvan',
      experiance: 'Senior',
      sexe: 'M'
    };
    const update: Update<IUser> = {
      id: data.uuid,
      changes: data
    }
    // this.store.dispatch(userAction.update({ user: update }));
  }

  clear(): void {
    // this.store.dispatch(userAction.clear());
  }



  trackByUSer(index: number, item: IUser): string {
    return item.uuid;
  }

  selectItem(item: IUser): void {
    // this.store.dispatch(userAction.selectedUser({ user: item }));
  }

  resetSelection() {
    // this.store.dispatch(userAction.selectedUser({}))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authStore.dispatch(AuthAction.logOut())

  }
}
