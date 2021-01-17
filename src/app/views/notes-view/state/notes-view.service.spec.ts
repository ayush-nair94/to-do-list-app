import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { NotesViewService } from './notes-view.service';
import { NotesViewActions } from './notes-view.actions';
import { AppStoreService } from 'src/app/core-module/app-store/state/app-store.service';
import { AppActions } from 'src/app/core-module/app-store/state/app-store.actions';
import { IUserNote, UserNote } from 'src/app/data-store/interfaces/IUserNote';
import { ISelectedNote } from '../models/ISelectedNote';
import { INoteAppState } from '../models/INoteAppState';
import { of } from 'rxjs';

describe('NotesViewServices', () => {
  let store: MockStore<IAppStoreState>;
  let service: NotesViewService;
  let noteViewAction = new NotesViewActions();
  const initialState = {
    userNotes: [],
    selectedNote: new UserNote(),
    addEditViewState: false,
    formState: '',
    searchTerm: '',
    viewLoading: false,
    activeTab: 'active'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [provideMockStore({ initialState }), NotesViewService, AppStoreService, AppActions, NotesViewActions],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(NotesViewService);
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callFake(() => {});
    spyOn(store, 'select').and.callFake(selector => { return of(true) });
  });

  it('should be created', () => {
      expect(service).toBeTruthy();
  })

  it('function dFetchUserNotes should dispatch action fetchUserNOtes', () => {
    service.dFetchUserNotes(1000);
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.fetchUserNotes(1000)
    );
  });

  it('function dSetSelectedNote should dispatch action setSelectedNote', () => {
    const noteData : ISelectedNote = {
        data: {
            id: 1,
            userId: 1000,
            title: "Morning Stand-up tasks",
            body: "Developer 1 - will connect with Jam and sort upthe designing process.",
            media: "",
            mediaFormat: "",
            status: "active",
            createdDate: new Date('2021-01-12T20:20:28.642Z'),
            updatedDate: new Date('2021-01-12T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        },
        state: "view"
    };
    service.dSetSelectedNote(noteData);
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.setSelectedNote(noteData)
    );
  });

  it('function dSetAddEditViewState should dispatch action setAddEditViewState', () => {
    const noteData : INoteAppState = {
        flag: true,
        state: 'add'
    };
    service.dSetAddEditViewState(noteData);
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.setAddEditViewState(noteData)
    );
  });

  it('function dResetStore should dispatch action resetStore', () => {
    service.dResetStore();
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.resetStore()
    );
  });

  it('function dSaveNote should dispatch action saveNote', () => {
    const noteData: IUserNote = {
        id: 1,
        userId: 1000,
        title: "Morning Stand-up tasks",
        body: "Developer 1 - will connect with Jam and sort upthe designing process.",
        media: "",
        mediaFormat: "",
        status: "active",
        createdDate: new Date('2021-01-12T20:20:28.642Z'),
        updatedDate: new Date('2021-01-12T20:20:28.642Z'),
        createdBy: "Ayush Nair",
        isDeleted: false
    }
    service.dSaveNote(noteData);
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.saveNote(noteData)
    );
  });

  it('function dEditNote should dispatch action editNote', () => {
    const noteData: IUserNote = {
        id: 1,
        userId: 1000,
        title: "Morning Stand-up tasks",
        body: "Developer 1 - will connect with Jam and sort upthe designing process.",
        media: "",
        mediaFormat: "",
        status: "active",
        createdDate: new Date('2021-01-12T20:20:28.642Z'),
        updatedDate: new Date('2021-01-12T20:20:28.642Z'),
        createdBy: "Ayush Nair",
        isDeleted: false
    }
    service.dEditNote(noteData);
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.editNote(noteData)
    );
  });

  it('function dDeleteNote should dispatch action deleteNote', () => {
    service.dDeleteNote(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.deleteNote(1)
    );
  });

  it('function dSetSearchTerm should dispatch action setSearchTerm', () => {
    service.dSetSearchTerm('test');
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.setSearchTerm('test')
    );
  });

  it('function dSetActiveTab should dispatch action setActiveTab', () => {
    service.dSetActiveTab('active');
    expect(store.dispatch).toHaveBeenCalledWith(
        noteViewAction.setActiveTab('active')
    );
  });

  it('function sGetUsersNote should select selector getUsersNote', () => {
    service.sGetUsersNote();
    expect(store.select).toHaveBeenCalledTimes(1);
  });

  it('function sGetSelectedNote should select selector getSelectedNote', () => {
    service.sGetSelectedNote();
    expect(store.select).toHaveBeenCalledTimes(1);
  });

  it('function sGetAddEditViewState should select selector getAddEditViewState', () => {
    service.sGetAddEditViewState();
    expect(store.select).toHaveBeenCalledTimes(1);
  });

  it('function sGetFormState should select selector getFormState', () => {
    service.sGetFormState();
    expect(store.select).toHaveBeenCalledTimes(1);
  });

  it('function sGetSearchTerm should select selector getSearchTerm', () => {
    service.sGetSearchTerm();
    expect(store.select).toHaveBeenCalledTimes(1);
  });

  it('function sGetViewLoading should select selector getViewLoading', () => {
    service.sGetViewLoading();
    expect(store.select).toHaveBeenCalledTimes(1);
  });

  it('function sGetActiveTab should select selector getActiveTab', () => {
    service.sGetActiveTab();
    expect(store.select).toHaveBeenCalledTimes(1);
  });
});
