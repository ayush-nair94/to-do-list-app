import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';

import * as selector from './notes-view.selector';
import { NotesViewActions } from './notes-view.actions';
import { IAppStoreState } from '../../../core-module/app-store/state/app-store.reducer';
import { AppStoreService } from '../../../core-module/app-store/state/app-store.service';
import { ISelectedNote } from '../models/ISelectedNote';
import { INoteAppState } from '../models/INoteAppState';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';

@Injectable()

export class NotesViewService {

  constructor(public appStoreSvc: AppStoreService,
    public actions: NotesViewActions,
    public store: Store<IAppStoreState>) {
      this.appStoreSvc.registerActionClass(actions);
      this.appStoreSvc.registerSelectors('NotesViewSelectors', selector);
  }

  //dispatchActions
  
  dFetchUserNotes(pId: number) {
    this.store.dispatch(this.actions.fetchUserNotes(pId));
  }

  dSetSelectedNote(pData: ISelectedNote) {
    this.store.dispatch(this.actions.setSelectedNote(pData));
  }

  dSetAddEditViewState(pData: INoteAppState) {
    this.store.dispatch(this.actions.setAddEditViewState(pData));
  }

  dResetStore() {
    this.store.dispatch(this.actions.resetStore());
  }

  dSaveNote(pData: IUserNote) {
    this.store.dispatch(this.actions.saveNote(pData));
  }

  dEditNote(pData: IUserNote) {
    this.store.dispatch(this.actions.editNote(pData));
  }

  dDeleteNote(pId: number) {
    this.store.dispatch(this.actions.deleteNote(pId));
  }

  dSetSearchTerm(pTerm: string) {
    this.store.dispatch(this.actions.setSearchTerm(pTerm));
  }

  //selectors

  sGetUsersNote() {
    return this.store.select(selector.getUserNotes);
  }

  sGetSelectedNote() {
    return this.store.select(selector.getSelectedNote);
  }

  sGetAddEditViewState() {
    return this.store.select(selector.getAddEditViewState);
  }

  sGetFormState() {
    return this.store.select(selector.getFormState);
  }

  sGetSearchTerm() {
    return this.store.select(selector.getSearchTerm);
  }

  sGetViewLoading() {
    return this.store.select(selector.getViewLoading);
  }

}

