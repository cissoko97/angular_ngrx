import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthState } from 'app/features/authentication/redux';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let store: MockStore;

  const initialState: AuthState = {
    loggedIn: false
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
