import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserComponent } from './list-user.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthState } from 'app/features/authentication/redux';

describe('ListUserComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  const initialState: AuthState = {
    loggedIn: false
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
