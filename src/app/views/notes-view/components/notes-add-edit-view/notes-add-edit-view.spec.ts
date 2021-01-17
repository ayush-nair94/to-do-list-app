import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NotesAddEditViewComponent } from './notes-add-edit-view.component';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';
import { NotesViewService } from '../../state/notes-view.service';
import { NotesViewActions } from '../../state/notes-view.actions';
import { AppStoreService } from 'src/app/core-module/app-store/state/app-store.service';
import { AppActions } from 'src/app/core-module/app-store/state/app-store.actions';
import { Router } from '@angular/router';

describe('NotesAddEditViewComponent', () => {
  let fixture: ComponentFixture<NotesAddEditViewComponent>;
  let component: NotesAddEditViewComponent;
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
      declarations: [NotesAddEditViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NotesAddEditViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
    localStorage.setItem('userName', JSON.stringify('Ayush Nair'));
    localStorage.setItem('userId',JSON.stringify(1000) );
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
})

  it('hideModal should call dSetAddEditViewState function and also navigate to /notes', () => {
    component.hideModal();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.setAddEditViewState({ flag: false, state: ''})
    );
    expect (routerSpy.navigate).toHaveBeenCalledWith(['notes/']);
  });

  it('saveNote should call dEditNote function without add state', () => {
    const userNote: IUserNote = {
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
    }
    component.saveNote();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.editNote(userNote)
    );
  });

  it('saveNote should call dSaveNote function with add state', () => {
    component.state = 'add';
    const userNote: IUserNote = {
        id: 1,
        userId: 1000,
        title: "Morning Stand-up tasks",
        body: "Developer 1 - will connect with Jam and sort upthe designing process.",
        media: "",
        mediaFormat: "",
        status: "active",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdBy: "Ayush Nair",
        isDeleted: false
    }
    component.saveNote();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.saveNote(userNote)
    );
  });

  it('editNote should call dSetAddEditViewState function', () => {
    component.editNote();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.setAddEditViewState({ flag: true, state: 'Edit'})
    );
  });

  it('deactivateNote should call dEditNote function', () => {
    const userNote: IUserNote = {
        id: 1,
        userId: 1000,
        title: "Morning Stand-up tasks",
        body: "Developer 1 - will connect with Jam and sort upthe designing process.",
        media: "",
        mediaFormat: "",
        status: "inactive",
        createdDate: new Date('2021-01-03T20:20:28.642Z'),
        updatedDate: new Date(),
        createdBy: "Ayush Nair",
        isDeleted: false
    }
    component.deactivateNote();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.editNote(userNote)
    );
  });

  it('activateNote should call dEditNote function', () => {
    const userNote: IUserNote = {
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
    }
    component.activateNote();
    expect(store.dispatch).toHaveBeenCalledWith(
      noteViewAction.editNote(userNote)
    );
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
    component.selectedNote = userNote;
    expect(component.updatedDate).toEqual('13/01/2021 01:50:28');
  });

  it('should get createdDate', () => {
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
    component.selectedNote = userNote;
    expect(component.createdDate).toEqual('13/01/2021 01:50:28');
  });

});
