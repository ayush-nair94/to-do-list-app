import { NotesViewActions } from './notes-view.actions';

describe('NoteViewActions', () => {
  let noteViewAction = new NotesViewActions();
  it('should create a FetchUserNotes action', () => {
    const action = noteViewAction.fetchUserNotes();
    expect(action.type).toEqual(NotesViewActions.FETCH_USER_NOTES);
  });

  it('should create a UserNotesFetched action', () => {
    const action = noteViewAction.userNotesFetched();
    expect(action.type).toEqual(NotesViewActions.USER_NOTES_FETCHED);
  });

  it('should create a SetViewLoading action', () => {
    const action = noteViewAction.setViewLoading();
    expect(action.type).toEqual(NotesViewActions.SET_VIEW_LOADING);
  });

  it('should create a SetSelectedNote action', () => {
    const action = noteViewAction.setSelectedNote();
    expect(action.type).toEqual(NotesViewActions.SET_SELECTED_NOTE);
  });

  it('should create a SetAddEditViewState action', () => {
    const action = noteViewAction.setAddEditViewState();
    expect(action.type).toEqual(NotesViewActions.SET_ADD_EDIT_VIEW_STATE);
  });

  it('should create a ResetStore action', () => {
    const action = noteViewAction.resetStore();
    expect(action.type).toEqual(NotesViewActions.RESET_STORE);
  });

  it('should create a SaveNote action', () => {
    const action = noteViewAction.saveNote();
    expect(action.type).toEqual(NotesViewActions.SAVE_NOTE);
  });

  it('should create a NoteSaved action', () => {
    const action = noteViewAction.noteSaved();
    expect(action.type).toEqual(NotesViewActions.NOTE_SAVED);
  });

  it('should create a EditNote action', () => {
    const action = noteViewAction.editNote();
    expect(action.type).toEqual(NotesViewActions.EDIT_NOTE);
  });

  it('should create a NoteEdited action', () => {
    const action = noteViewAction.noteEdited();
    expect(action.type).toEqual(NotesViewActions.NOTE_EDITED);
  });

  it('should create a DeleteNote action', () => {
    const action = noteViewAction.deleteNote();
    expect(action.type).toEqual(NotesViewActions.DELETE_NOTE);
  });

  it('should create a NoteDeleted action', () => {
    const action = noteViewAction.noteDeleted();
    expect(action.type).toEqual(NotesViewActions.NOTE_DELETED);
  });

  it('should create a SetSearchTerm action', () => {
    const action = noteViewAction.setSearchTerm();
    expect(action.type).toEqual(NotesViewActions.SET_SEARCH_TERM);
  });

  it('should create a SetActiveTab action', () => {
    const action = noteViewAction.setActiveTab();
    expect(action.type).toEqual(NotesViewActions.SET_ACTIVE_TAB);
  });

//   it('SHOULD create a SetData action containing a payload', () => {
//     const payload = { id: 1, value: {} };
//     const action = new Actions.SetData(payload);

//     expect({ ...action }).toEqual({
//       type: Actions.SET_DATA,
//       payload
//     });
//   });
});