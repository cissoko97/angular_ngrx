import { TestBed } from '@angular/core/testing';
import { NoAuthGuard } from './no-auth.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthState } from 'app/features/authentication/redux';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;


  let store: MockStore;

  const initialState: AuthState = {
    loggedIn: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NoAuthGuard,
        provideMockStore({ initialState }),
      ]
    });
    guard = TestBed.inject(NoAuthGuard);
    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
