import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CardComponent } from './card.component';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { UserNote, IUserNote } from 'src/app/data-store/interfaces/IUserNote';
import { NotesViewService } from '../../state/notes-view.service';
import { NotesViewActions } from '../../state/notes-view.actions';
import { AppStoreService } from 'src/app/core-module/app-store/state/app-store.service';
import { AppActions } from 'src/app/core-module/app-store/state/app-store.actions';
import { ISelectedNote } from '../../models/ISelectedNote';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;
  let noteViewAction = new NotesViewActions();
  let store: MockStore<IAppStoreState>;
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
      declarations: [CardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    component.cardEntityDetail = {
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
    };
    spyOn(store, 'dispatch').and.callFake(() => {});
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
})

  it('viewNote should call dSetSelectedNote function', () => {
    const userNote: ISelectedNote = {
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
        state: 'View'
    }
    component.viewNote();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.setSelectedNote(userNote)
    );
  });

  it('should set cardEntityDetail', () => {
    const userNote: IUserNote = {
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
    component.cardData = userNote;
    expect(component.cardEntityDetail).toEqual(userNote);
  });

  it('should get updatedDate', () => {
    const userNote: IUserNote = {
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
    component.cardEntityDetail = userNote;
    expect(component.updatedDate).toEqual('13/01/2021 01:50:28');
  });

});
