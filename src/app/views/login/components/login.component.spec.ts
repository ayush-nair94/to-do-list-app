import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { Router } from '@angular/router';
import { UserService } from '../state/user.service';
import { UserActions } from '../state/user.actions';
import { AppStoreService } from 'src/app/core-module/app-store/state/app-store.service';
import { AppActions } from 'src/app/core-module/app-store/state/app-store.actions';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let userAction = new UserActions();
  let store: MockStore<IAppStoreState>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  const initialState: IAppStoreState = {
    notes: {
        userNotes: [],
        selectedNote: {
            id: 1,
            userId: 1000,
            title: "Morning Stand-up tasks",
            body: "Developer 1 - will connect with Jam and sort upthe designing process.",
            media: "",
            mediaFormat: "",
            status: "active",
            createdDate: new Date('2021-01-03T20:20:28.642Z'),
            updatedDate: new Date(),
            createdBy: "Ayush Nair",
            isDeleted: false
        },
        addEditViewState: false,
        formState: '',
        searchTerm: '',
        viewLoading: false,
        activeTab: 'active'
    },
    user: {
        routerUrl: "",
        signUpState: false
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      providers: [provideMockStore({ initialState }), UserService, UserActions, AppStoreService, AppActions, {provide: Router, useValue: routerSpy}],
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should be createable', () => expect(component).toBeTruthy());

  it('login should call dLoginUser function', () => {
    component.login();
    expect(store.dispatch).toHaveBeenCalledWith(
      userAction.loginUser({})
    );
  });

  it('signUp should call dSetSignUpState function', () => {
    component.signUp(true);
    expect(store.dispatch).toHaveBeenCalledWith(
      userAction.setSignUpState(true)
    );
  });

  it('signUpUser should call dSignUpUser function', () => {
    component.signUpUser();
    expect(store.dispatch).toHaveBeenCalledWith(
      userAction.signUpUser({})
    );
  });

//   it('logout should call dResetStore function and navigate to login', () => {
//     component.logout();
//     expect(store.dispatch).toHaveBeenCalledWith(
//       noteViewAction.resetStore()
//     );
//     expect (routerSpy.navigate).toHaveBeenCalledWith(['login']);
//   });

});
