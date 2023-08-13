import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookComponent } from './list-book.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
class StoreMock {
  // How we did it before
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
}

describe('ListBookComponent', () => {
  let component: ListBookComponent;
  let fixture: ComponentFixture<ListBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBookComponent],
      providers: [
        {
          provide: Store,
          useClass: StoreMock,
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
