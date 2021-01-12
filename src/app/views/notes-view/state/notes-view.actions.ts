import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from '../../../core-module/app-store/utils/action-creator.utils';

@Injectable()
export class NotesViewActions {

    /** ActionsList */
    static FETCH_USER_NOTES                         = '[NOTES_VIEW] FETCH_USER_NOTES';
    static USER_NOTES_FETCHED                       = '[NOTES_VIEW] USER_NOTES_FETCHED';
    static SET_VIEW_LOADING                         = '[NOTES_VIEW] SET_VIEW_LOADING';
    static SET_SELECTED_NOTE                        = '[NOTES_VIEW] SET_SELECTED_NOTE';
    static SET_ADD_EDIT_VIEW_STATE                  = '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE';
    static RESET_STORE                              = '[NOTES_VIEW] RESET_STORE';
    static SAVE_NOTE                                = '[NOTES_VIEW] SAVE_NOTE';
    static NOTE_SAVED                               = '[NOTES_VIEW] NOTE_SAVED';
    static EDIT_NOTE                                = '[NOTES_VIEW] EDIT_NOTE';
    static NOTE_EDITED                              = '[NOTES_VIEW] NOTE_EDITED';
    static DELETE_NOTE                              = '[NOTES_VIEW] DELETE_NOTE';
    static NOTE_DELETED                             = '[NOTES_VIEW] NOTE_DELETED';
    static SET_SEARCH_TERM                          = '[NOTES_VIEW] SET_SEARCH_TERM';


    fetchUserNotes                                  = ActionCreatorFactory.create!(NotesViewActions.FETCH_USER_NOTES);
    userNotesFetched                                = ActionCreatorFactory.create!(NotesViewActions.USER_NOTES_FETCHED);
    setViewLoading                                  = ActionCreatorFactory.create!(NotesViewActions.SET_VIEW_LOADING);
    setSelectedNote                                 = ActionCreatorFactory.create!(NotesViewActions.SET_SELECTED_NOTE);
    setAddEditViewState                             = ActionCreatorFactory.create!(NotesViewActions.SET_ADD_EDIT_VIEW_STATE);   
    resetStore                                      = ActionCreatorFactory.create!(NotesViewActions.RESET_STORE);  
    saveNote                                        = ActionCreatorFactory.create!(NotesViewActions.SAVE_NOTE);
    noteSaved                                       = ActionCreatorFactory.create!(NotesViewActions.NOTE_SAVED); 
    editNote                                        = ActionCreatorFactory.create!(NotesViewActions.EDIT_NOTE); 
    noteEdited                                      = ActionCreatorFactory.create!(NotesViewActions.NOTE_EDITED); 
    deleteNote                                      = ActionCreatorFactory.create!(NotesViewActions.DELETE_NOTE); 
    noteDeleted                                     = ActionCreatorFactory.create!(NotesViewActions.NOTE_DELETED); 
    setSearchTerm                                   = ActionCreatorFactory.create!(NotesViewActions.SET_SEARCH_TERM); 
}
