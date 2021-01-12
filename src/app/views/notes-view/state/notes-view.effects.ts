import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';
import { EMPTY, Observable, of, concat } from "rxjs";
import { Action } from '@ngrx/store';

import { IAction } from "../../../core-module/app-store/interfaces/IAction";
import { AppDataStoreService } from 'src/app/core-module/services/api.service';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';
import * as NoteViewActions from './notes-view.actions';
import { AlertService } from 'src/app/core-module/alert/alert.service';


@Injectable()
export class NotesViewEffects {
    constructor( private actions$: Actions,
                private _dataStoreApi: AppDataStoreService,
                private _alertSvc: AlertService) {}


    eFetchUserNotes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteViewActions.NotesViewActions.FETCH_USER_NOTES),
      switchMap((pAction: IAction) =>{
            return concat (
                of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: true}),
                this._dataStoreApi.getNotesOfUsers(pAction.payload)
                    .pipe(
                        switchMap((data: Array<IUserNote>) => {
                            data = data.filter(note => { return note.userId == pAction.payload; })
                            return of({type: '[NOTES_VIEW] USER_NOTES_FETCHED', payload: data})
                        }),
                        catchError((error: Error) => {
                            this._alertSvc.error('Error in fetching notes');
                            return EMPTY; })
                    ),
                of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: false})
            )
       })
    ));

    eSaveNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteViewActions.NotesViewActions.SAVE_NOTE),
      switchMap((pAction: IAction) =>{
            return concat (
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: true}),
                this._dataStoreApi.addNote(pAction.payload)
                    .pipe(
                        switchMap((data) => {
                            this._alertSvc.success('Note added successfully');
                            return concat(
                                of({type: '[NOTES_VIEW] NOTE_SAVED', payload: data}),
                                of({type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE', payload: {flag: false, state: ''}}),
                                of({type: '[NOTES_VIEW] FETCH_USER_NOTES', payload: JSON.parse(localStorage.getItem('userId'))}),
                            )
                        }),
                        catchError((error: Error) => {
                            this._alertSvc.error('Error in adding note');
                            return EMPTY; })
                    ),
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: false})
            )
       })
    ));

    eEditNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteViewActions.NotesViewActions.EDIT_NOTE),
      switchMap((pAction: IAction) =>{
            return concat (
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: true}),
                this._dataStoreApi.editNote(pAction.payload)
                    .pipe(
                        switchMap((data) => {
                            this._alertSvc.success('Note edited successfully');
                            return concat(
                                of({type: '[NOTES_VIEW] NOTE_EDITED', payload: data}),
                                of({type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE', payload: {flag: false, state: ''}}),
                                of({type: '[NOTES_VIEW] FETCH_USER_NOTES', payload: JSON.parse(localStorage.getItem('userId'))}),
                            )
                        }),
                        catchError((error: Error) => {
                            this._alertSvc.error('Error in editing note');
                            return EMPTY; })
                    ),
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: false})
            )
       })
    ));

    eDeleteNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteViewActions.NotesViewActions.DELETE_NOTE),
      switchMap((pAction: IAction) =>{
            return concat (
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: true}),
                this._dataStoreApi.deleteNote(pAction.payload)
                    .pipe(
                        switchMap((data) => {
                            this._alertSvc.success('Note deleted successfully');
                            return concat(
                                of({type: '[NOTES_VIEW] FETCH_USER_NOTES', payload: JSON.parse(localStorage.getItem('userId'))}),
                                of({type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE', payload: {flag: false, state: ''}})
                            )
                        }),
                        catchError((error: Error) => {
                            this._alertSvc.error('Error in deleting note');
                            return EMPTY; })
                    ),
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: false})
            )
       })
    ));
}