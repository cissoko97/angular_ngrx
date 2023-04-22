import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { UserState } from './features/user/redux';


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

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AppComponent);
    fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tutoriel_ngrx'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tutoriel_ngrx');
  });

  it('should render title', () => {
    fixture.detectChanges();
    // fixture.componentInstance.
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('tutoriel_ngrx app is running!');
  });
});
