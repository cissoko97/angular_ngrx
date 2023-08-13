import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HasRoleDirective } from './has-role.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockAuthenticationService } from 'app/_test/fake_librarie';
import { AppComponent } from 'app/app.component';
import { AuthenticationService } from 'app/core/services';
import { AuthState } from 'app/features/authentication/redux';
import { RouterTestingModule } from '@angular/router/testing';


describe('HasRoleDirective', () => {
  let store: MockStore;

  const initialState: AuthState = {
    loggedIn: false
  }
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HasRoleDirective],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthenticationService, useValue: mockAuthenticationService }]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
