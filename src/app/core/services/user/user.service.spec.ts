import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideMockStore } from '@ngrx/store/testing';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from 'app/entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideMockStore()
      ], imports: [
        EntityDataModule.forRoot(
          entityConfig
        ),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
