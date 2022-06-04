import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HydratationEffects } from './hydratation.effects';

describe('HydratationEffects', () => {
  let actions$: Observable<any>;
  let effects: HydratationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HydratationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(HydratationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
