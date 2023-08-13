import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthGuard } from './auth.guard';
import { AuthState } from 'app/features/authentication/redux';

describe('AuthGuard', () => {

  let guard: AuthGuard;
  let store: MockStore;

  const initialState: AuthState = {
    loggedIn: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore({ initialState }),
      ]
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
