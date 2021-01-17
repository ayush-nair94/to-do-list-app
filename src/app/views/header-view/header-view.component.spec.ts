import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HeaderViewComponent } from './header-view.component';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { NotesViewService } from '../notes-view/state/notes-view.service';
import { NotesViewActions } from '../notes-view/state/notes-view.actions';
import { AppStoreService } from 'src/app/core-module/app-store/state/app-store.service';
import { AppActions } from 'src/app/core-module/app-store/state/app-store.actions';
import { Router } from '@angular/router';

describe('HeaderViewComponent', () => {
  let fixture: ComponentFixture<HeaderViewComponent>;
  let component: HeaderViewComponent;
  let noteViewAction = new NotesViewActions();
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
      ],
      providers: [provideMockStore({ initialState }), NotesViewService, AppStoreService, AppActions, NotesViewActions, {provide: Router, useValue: routerSpy}],
      declarations: [HeaderViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should be createable', () => expect(component).toBeTruthy());

  it('search should call dSetSearchTerm function', () => {
    component.search('term');
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.setSearchTerm('term')
    );
  });

  it('logout should call dResetStore function and navigate to login', () => {
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.resetStore()
    );
    expect (routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });

});
