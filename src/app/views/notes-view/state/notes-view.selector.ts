import { IAppStoreState } from '../../../core-module/app-store/state/app-store.reducer';

export function getUserNotes(state: IAppStoreState) {
    const gameState = state.notes.userNotes;
    return gameState;
}

export function getSelectedNote(state: IAppStoreState) {
    const selectedNote = state.notes.selectedNote;
    return selectedNote;
}

export function getAddEditViewState(state: IAppStoreState) {
    const addEditViewState = state.notes.addEditViewState;
    return addEditViewState;
}

export function getFormState(state: IAppStoreState) {
    const formState = state.notes.formState;
    return formState;
}

export function getSearchTerm(state: IAppStoreState) {
    const searchTerm = state.notes.searchTerm;
    return searchTerm;
}

export function getViewLoading(state: IAppStoreState) {
    const viewLoading = state.notes.viewLoading;
    return viewLoading;
}

export function getActiveTab(state: IAppStoreState) {
    const activeTab = state.notes.activeTab;
    return activeTab;
}


