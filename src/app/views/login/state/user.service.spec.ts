import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { UserService } from './user.service';
import { AppStoreService } from 'src/app/core-module/app-store/state/app-store.service';
import { AppActions } from 'src/app/core-module/app-store/state/app-store.actions';
import { of } from 'rxjs';
import { UserActions } from './user.actions';

describe('UserServices', () => {
  let store: MockStore<IAppStoreState>;
  let service: UserService;
  let noteViewAction = new UserActions();
  const initialState = {
    routerUrl: "",
    signUpState: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [provideMockStore({ initialState }), UserService, AppStoreService, AppActions, UserActions],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(UserService);
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callFake(() => {});
    spyOn(store, 'select').and.callFake(selector => { return of(true) });
  });

  it('should be created', () => {
      expect(service).toBeTruthy();
  })

  it('function dLoginUser should dispatch action loginUser', () => {
    service.dLoginUser({});
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.loginUser({})
    );
  });

  it('function dSetSignUpState should dispatch action setSignUpState', () => {
    service.dSetSignUpState(true);
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.setSignUpState(true)
    );
  });

  it('function dSignupUser should dispatch action signupUser', () => {
    service.dSignUpUser({});
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.signUpUser({})
    );
  });

  it('function sGetRouterUrl should select selector getRouterUrl', () => {
    service.sGetRouterUrl();
    expect(store.select).toHaveBeenCalledTimes(1);
  });

  it('function sGetSignUpState should select selector getSignupState', () => {
    service.sGetSignUpState();
    expect(store.select).toHaveBeenCalledTimes(1);
  });
});
