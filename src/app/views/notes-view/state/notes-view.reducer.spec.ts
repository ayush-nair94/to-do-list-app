import * as fromReducer from './notes-view.reducer';
import { IAction } from 'src/app/core-module/app-store/interfaces/IAction';
import { IUserNote, UserNote } from 'src/app/data-store/interfaces/IUserNote';
import { INotesViewState } from './notes-view.reducer';
import { ISelectedNote } from '../models/ISelectedNote';
import { INoteAppState } from '../models/INoteAppState';

describe('NotesReducer', () => {

// test spec for default action
  describe('default action', () => {
    it('should return the default state', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const action: IAction = {
        type: 'Unknown',
        payload: ''
      };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state).toBe(DEFAULT_NOTES_STATE);
    });
  });

  // test spec for user notes fetched action
  describe('all user notes fetched action', () => {
    it('should update the property userNotes in state', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const newState: INotesViewState = 
      {
        userNotes: [ {
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
        {
            id: 2,
            userId: 1000,
            title: "Client task syncup work",
            body: "Design the UI screens. Discuss the mockup",
            media: "",
            mediaFormat: "",
            status: "inactive",
            createdDate: new Date('2021-01-09T20:20:28.642Z'),
            updatedDate: new Date('2021-01-09T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        }],
        selectedNote: new UserNote(),
        addEditViewState: false,
        formState: '',
        searchTerm: '',
        viewLoading: false,
        activeTab: 'active'
      };
      const userNotes : Array<IUserNote> = [
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
        },
        {
            id: 2,
            userId: 1000,
            title: "Client task syncup work",
            body: "Design the UI screens. Discuss the mockup",
            media: "",
            mediaFormat: "",
            status: "inactive",
            createdDate: new Date('2021-01-09T20:20:28.642Z'),
            updatedDate: new Date('2021-01-09T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        }
      ];
      const action: IAction = {
          type: '[NOTES_VIEW] USER_NOTES_FETCHED',
          payload: userNotes
      };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state.userNotes).toEqual(newState.userNotes);
      expect(state).not.toBe(newState);
    });
  });

  
  //test spec for set selected note action
  describe('set selected note action', () => {
    it('should update the addEditViewState, selectedNote and formState properties', () => {
        const { DEFAULT_NOTES_STATE } = fromReducer;
        const newState: INotesViewState = 
        {
          userNotes: [],
          selectedNote: {
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
          addEditViewState: true,
          formState: 'View',
          searchTerm: '',
          viewLoading: false,
          activeTab: 'active'
        };
        const selectedNote : ISelectedNote = 
          {
              data : {
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
          };
        const action: IAction = {
            type: '[NOTES_VIEW] SET_SELECTED_NOTE',
            payload: selectedNote
        };
        const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);
  
        expect(state.userNotes).toEqual(newState.userNotes);
        expect(state).not.toBe(newState);
    });
  });

  //test spec for setAddEditViewState action
  describe('setAddEditViewState action', () => {
    it('should update the state with addEditViewState and formState (View and Edit Screen)', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const newState: INotesViewState = 
        {
          userNotes: [],
          selectedNote: new UserNote(),
          addEditViewState: false,
          formState: 'View',
          searchTerm: '',
          viewLoading: false,
          activeTab: 'active'
        };
        const actionData: INoteAppState = {
            flag: false,
            state: 'View'
        }
        const action: IAction = {
            type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE',
            payload: actionData
        };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should update the state with addEditViewState , formState and selectedNote(Add Screen)', () => {
        const DEFAULT_NOTES_STATE : INotesViewState = {
            userNotes: [],
            selectedNote: {
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
            addEditViewState: false,
            formState: '',
            searchTerm: '',
            viewLoading: false,
            activeTab: 'active'
        };
        const newState: INotesViewState = 
          {
            userNotes: [],
            selectedNote: new UserNote(),
            addEditViewState: true,
            formState: 'Add',
            searchTerm: '',
            viewLoading: false,
            activeTab: 'active'
          };
          const actionData: INoteAppState = {
              flag: true,
              state: 'Add'
          }
          const action: IAction = {
              type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE',
              payload: actionData
          };
        const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);
  
        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
      });

      it('should update the state with addEditViewState , formState (Reset from View/Add/Edit Screen)', () => {
        const DEFAULT_NOTES_STATE : INotesViewState = {
            userNotes: [],
            selectedNote: {
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
            addEditViewState: true,
            formState: 'Edit',
            searchTerm: '',
            viewLoading: false,
            activeTab: 'active'
        };
        const newState: INotesViewState = 
          {
            userNotes: [],
            selectedNote: {
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
            addEditViewState: false,
            formState: '',
            searchTerm: '',
            viewLoading: false,
            activeTab: 'active'
          };
          const actionData: INoteAppState = {
              flag: false,
              state: ''
          }
          const action: IAction = {
              type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE',
              payload: actionData
          };
        const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);
  
        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
      });
  });

  //test spec for Notes store restore action
  describe('reset store action', () => {
    it('should update the state to initial state', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const action: IAction = {
        type: '[NOTES_VIEW] RESET_STORE',
        payload: ''
      };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state).toBe(DEFAULT_NOTES_STATE);
    });
  });

  //test spec for Notes store restore action
  describe('note saved action', () => {
    it('should update the state with newly added note', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const newState: INotesViewState = 
      {
        userNotes: [ {
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
        }],
        selectedNote: new UserNote(),
        addEditViewState: false,
        formState: '',
        searchTerm: '',
        viewLoading: false,
        activeTab: 'active'
      };
      const action: IAction = {
        type: '[NOTES_VIEW] NOTE_SAVED',
        payload: {
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
      };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  //test spec for set search termaction
  describe('set search term action', () => {
    it('should update the state with search term', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const newState: INotesViewState = 
      {
        userNotes: [],
        selectedNote: new UserNote(),
        addEditViewState: false,
        formState: '',
        searchTerm: 'search',
        viewLoading: false,
        activeTab: 'active'
      };
      const action: IAction = {
        type: '[NOTES_VIEW] SET_SEARCH_TERM',
        payload: 'search'
      };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state.searchTerm).toBe(newState.searchTerm);
      expect(state).not.toBe(newState);
    });
  });

  //test spec for set view loading
  describe('set view loading action', () => {
    it('should update the state with view loading flag', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const newState: INotesViewState = 
      {
        userNotes: [],
        selectedNote: new UserNote(),
        addEditViewState: false,
        formState: '',
        searchTerm: '',
        viewLoading: true,
        activeTab: 'active'
      };
      const action: IAction = {
        type: '[NOTES_VIEW] SET_VIEW_LOADING',
        payload: true
      };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state.viewLoading).toBe(newState.viewLoading);
      expect(state).not.toBe(newState);
    });
  });

  //test spec for set active tab
  describe('set active tab action', () => {
    it('should update the state with active tab value', () => {
      const { DEFAULT_NOTES_STATE } = fromReducer;
      const newState: INotesViewState = 
      {
        userNotes: [],
        selectedNote: new UserNote(),
        addEditViewState: false,
        formState: '',
        searchTerm: '',
        viewLoading: false,
        activeTab: 'inactive'
      };
      const action: IAction = {
        type: '[NOTES_VIEW] SET_ACTIVE_TAB',
        payload: 'inactive'
      };
      const state = fromReducer.notesView(DEFAULT_NOTES_STATE, action);

      expect(state.activeTab).toBe(newState.activeTab);
      expect(state).not.toBe(newState);
    });
  });
});
