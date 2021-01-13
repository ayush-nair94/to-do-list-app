import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { EMPTY, Observable, of, concat } from "rxjs";
import { Action, select, Store } from '@ngrx/store';
import * as _ from 'lodash';

import { IAction } from "../../../core-module/app-store/interfaces/IAction";
import { AppDataStoreService } from 'src/app/core-module/services/api.service';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';
import * as NoteViewActions from './notes-view.actions';
import { AlertService } from 'src/app/core-module/alert/alert.service';
import { IAppStoreState } from 'src/app/core-module/app-store';
import { getUserNotes } from './notes-view.selector';


@Injectable()
export class NotesViewEffects {
    constructor( private actions$: Actions,
                private _dataStoreApi: AppDataStoreService,
                private _alertSvc: AlertService,
                public store: Store<IAppStoreState>) {}


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
                            this._alertSvc.error('Error in fetching notes', true);
                            return EMPTY; })
                    ),
                of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: false})
            )
       })
    ));

    eSaveNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteViewActions.NotesViewActions.SAVE_NOTE),
      withLatestFrom(this.store.select(getUserNotes)),
      mergeMap((pAction: any) =>{
            let userNotes = _.cloneDeep(pAction[1]);
            let newUserNote : IUserNote = _.cloneDeep(pAction[0].payload);
            newUserNote.id = userNotes.length > 0 ? userNotes[userNotes.length - 1].id + 1 : 1;
            return concat (
                this._dataStoreApi.addNote(newUserNote)
                    .pipe(
                        switchMap((data) => {
                            this._alertSvc.success('Note added successfully', true);
                            return concat(
                                of({type: '[NOTES_VIEW] NOTE_SAVED', payload: data}),
                                of({type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE', payload: {flag: false, state: ''}}),
                                of({type: '[NOTES_VIEW] FETCH_USER_NOTES', payload: JSON.parse(localStorage.getItem('userId'))}),
                            )
                        }),
                        catchError((error: Error) => {
                            this._alertSvc.error('Error in adding note', true);
                            return EMPTY; })
                    ),
            )
       })
    ));

    eEditNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteViewActions.NotesViewActions.EDIT_NOTE),
      switchMap((pAction: IAction) =>{
            return concat (
                this._dataStoreApi.editNote(pAction.payload)
                    .pipe(
                        switchMap((data) => {
                            this._alertSvc.success('Note edited successfully', true);
                            return concat(
                                of({type: '[NOTES_VIEW] NOTE_EDITED', payload: data}),
                                of({type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE', payload: {flag: false, state: ''}}),
                                of({type: '[NOTES_VIEW] FETCH_USER_NOTES', payload: JSON.parse(localStorage.getItem('userId'))}),
                            )
                        }),
                        catchError((error: Error) => {
                            this._alertSvc.error('Error in editing note', true);
                            return EMPTY; })
                    )
            )
       })
    ));

    eDeleteNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteViewActions.NotesViewActions.DELETE_NOTE),
      switchMap((pAction: IAction) =>{
            return concat (
                this._dataStoreApi.deleteNote(pAction.payload)
                    .pipe(
                        switchMap((data) => {
                            this._alertSvc.success('Note deleted successfully', true);
                            return concat(
                                of({type: '[NOTES_VIEW] FETCH_USER_NOTES', payload: JSON.parse(localStorage.getItem('userId'))}),
                                of({type: '[NOTES_VIEW] SET_ADD_EDIT_VIEW_STATE', payload: {flag: false, state: ''}})
                            )
                        }),
                        catchError((error: Error) => {
                            this._alertSvc.error('Error in deleting note', true);
                            return EMPTY; })
                    ),
            )
       })
    ));
}