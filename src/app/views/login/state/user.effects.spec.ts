import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';

import { UserEffects } from './user.effects';
import { AppDataStoreService } from 'src/app/core-module/services/api.service';
import { AlertService } from 'src/app/core-module/alert/alert.service';

describe('UserEffects', () => {
  const initialState = { 
    routerUrl: "",
    signUpState: false
  };
  const dataStoreApiService = jasmine.createSpyObj('dataStoreApiService', [
    'getUsers',
    'signUpUser'
  ]);

  const alertService = jasmine.createSpyObj('alertService', [
      'success',
      'error'
  ])
  let effects: UserEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: AppDataStoreService, useValue: dataStoreApiService },
        { provide: AlertService, useValue: alertService}
      ]
    });

    effects = TestBed.inject(UserEffects);
    store = TestBed.inject(MockStore);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});
