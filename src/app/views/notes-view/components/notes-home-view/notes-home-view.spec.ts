import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NotesHomeViewComponent } from './notes-home-view.component';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { NotesViewService } from '../../state/notes-view.service';
import { NotesViewActions } from '../../state/notes-view.actions';
import { AppStoreService } from 'src/app/core-module/app-store/state/app-store.service';
import { AppActions } from 'src/app/core-module/app-store/state/app-store.actions';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';

describe('NotesHomeViewComponent', () => {
  let fixture: ComponentFixture<NotesHomeViewComponent>;
  let component: NotesHomeViewComponent;
  let noteViewAction = new NotesViewActions();
  let store: MockStore<IAppStoreState>;
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
      providers: [provideMockStore({ initialState }), NotesViewService, AppStoreService, AppActions, NotesViewActions],
      declarations: [NotesHomeViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NotesHomeViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  })

  it('add should call dSetAddEditViewState function', () => {
    component.add();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.setAddEditViewState({ flag: true, state: 'Add'})
    );
  });

  it('setActiveTab should call dSetActiveTab function', () => {
    component.setActiveTab('active');
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.setActiveTab('active')
    );
  });

  it('should get userNotesList', () => {
    const userNotes: Array<IUserNote> = [
        {
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
    ]
    component.userNotes = userNotes;
    component.activeTab = 'active';
    expect(component.userNotesList).toEqual(userNotes);
  });

  it('should get active notes count', () => {
    const userNotes: Array<IUserNote> = [
        {
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
    ]
    component.userNotes = userNotes;
    expect(component.activeNoteCount).toEqual(1);
  });

  it('should get active notes count', () => {
    const userNotes: Array<IUserNote> = [
        {
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
    ]
    component.userNotes = userNotes;
    expect(component.inactiveNoteCount).toEqual(0);
  });

});
