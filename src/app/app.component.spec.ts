import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { UserState } from './features/user/redux';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'

class StoreMock {
  // How we did it before
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let store: Store<UserState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: Store,
          useClass: StoreMock,
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.get(Store);
    fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tutoriel_ngrx'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tutoriel ngrx');
  });
});
