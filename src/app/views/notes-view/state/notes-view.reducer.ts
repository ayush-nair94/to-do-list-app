import * as _ from 'lodash';

import { IAction } from '../../../core-module/app-store/interfaces/IAction';
import { IUserNote, UserNote } from '../../../data-store/interfaces/IUserNote';
import { NotesViewActions } from './notes-view.actions';



/** Interface and Initial State */
export interface INotesViewState {
  userNotes: Array<IUserNote>;
  selectedNote: IUserNote;
  addEditViewState: boolean;
  formState: string;
  searchTerm: string;
  viewLoading: boolean;
}

export const DEFAULT_NOTES_STATE = {
  userNotes: [],
  selectedNote: new UserNote(),
  addEditViewState: false,
  formState: '',
  searchTerm: '',
  viewLoading: false
};

/** Reducer */
export function notesView(state: INotesViewState = DEFAULT_NOTES_STATE, action: IAction): INotesViewState {
    switch (action.type) {

        case NotesViewActions.USER_NOTES_FETCHED:
            return handleUserNotesFetched(state, action);

        case NotesViewActions.SET_SELECTED_NOTE:
            return handleSetSelectedNote(state, action);

        case NotesViewActions.SET_ADD_EDIT_VIEW_STATE:
            return handleSetAddEditViewState(state, action);

        case NotesViewActions.RESET_STORE:
            return handleResetStore(state, action);

        case NotesViewActions.NOTE_SAVED:
            return handleNoteSaved(state, action);

        case NotesViewActions.SET_SEARCH_TERM:
            return handleSetSearchTerm(state, action);

        case NotesViewActions.SET_VIEW_LOADING:
            return handleSetViewLoading(state, action);

        default:
            return state;
    }

}

/** Reducer Handlers */

function handleUserNotesFetched(pState: INotesViewState, pAction: IAction) : INotesViewState {
    let newState = _.cloneDeep(pState);
    newState.userNotes = pAction.payload;
    return newState;
}

function handleSetSelectedNote(pState: INotesViewState, pAction: IAction): INotesViewState {
    let newState = _.cloneDeep(pState);
    newState.addEditViewState = true;
    newState.selectedNote = pAction.payload.data;
    newState.formState = pAction.payload.state;
    return newState;
}

function handleSetAddEditViewState(pState: INotesViewState, pAction: IAction): INotesViewState {
    let newState = _.cloneDeep(pState);
    newState.addEditViewState = pAction.payload.flag;
    newState.formState = pAction.payload.state;
    if(newState.addEditViewState && newState.formState.toLowerCase() == 'add') {
        newState.selectedNote = new UserNote();
    }
    return newState;
}

function handleResetStore(pState: INotesViewState, pAction: IAction): INotesViewState {
    let newState = _.cloneDeep(pState);
    newState = DEFAULT_NOTES_STATE;
    return newState;
}

function handleNoteSaved(pState: INotesViewState, pAction: IAction): INotesViewState {
    let newState = _.cloneDeep(pState);
    newState.userNotes.push(pAction.payload);
    return newState;
}

function handleSetSearchTerm(state: INotesViewState, action: IAction): INotesViewState {
    let newState = _.cloneDeep(state);
    newState.searchTerm = action.payload;
    return newState;
}

function handleSetViewLoading(state: INotesViewState, action: IAction): INotesViewState {
    let newState = _.cloneDeep(state);
    newState.viewLoading = action.payload;
    return newState;
}



