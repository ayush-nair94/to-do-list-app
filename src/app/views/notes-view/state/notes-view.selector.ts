import { IAppStoreState } from '../../../core-module/app-store/state/app-store.reducer';
import { createSelector } from '@ngrx/store';
import { INotesViewState } from './notes-view.reducer';

export const notesFeature = (state: IAppStoreState) => state.notes;
 
export const getUserNotes = createSelector(
    notesFeature,
  (state: INotesViewState) => state.userNotes
);

export const getSelectedNote = createSelector(
    notesFeature,
  (state: INotesViewState) => state.selectedNote
);

export const getAddEditViewState = createSelector(
    notesFeature,
  (state: INotesViewState) => state.addEditViewState
);

export const getFormState = createSelector(
    notesFeature,
  (state: INotesViewState) => state.formState
);

export const getSearchTerm = createSelector(
    notesFeature,
  (state: INotesViewState) => state.searchTerm
);

export const getViewLoading = createSelector(
    notesFeature,
  (state: INotesViewState) => state.viewLoading
);

export const getActiveTab = createSelector(
    notesFeature,
  (state: INotesViewState) => state.activeTab
);


