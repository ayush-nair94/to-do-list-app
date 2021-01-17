import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';

import { NotesViewEffects } from './notes-view.effects';
import { UserNote } from 'src/app/data-store/interfaces/IUserNote';
import { AppDataStoreService } from 'src/app/core-module/services/api.service';
import { AlertService } from 'src/app/core-module/alert/alert.service';

describe('NotesViewEffects', () => {
  const initialState = { 
    userNotes: [],
    selectedNote: new UserNote(),
    addEditViewState: false,
    formState: '',
    searchTerm: '',
    viewLoading: false,
    activeTab: 'active' 
  };
  const dataStoreApiService = jasmine.createSpyObj('dataStoreApiService', [
    'getNotesOfUsers',
    'addNote',
    'editNote',
    'deleteNote'
  ]);

  const alertService = jasmine.createSpyObj('alertService', [
      'success',
      'error'
  ])
  let effects: NotesViewEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotesViewEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: AppDataStoreService, useValue: dataStoreApiService },
        { provide: AlertService, useValue: alertService}
      ]
    });

    effects = TestBed.inject(NotesViewEffects);
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
