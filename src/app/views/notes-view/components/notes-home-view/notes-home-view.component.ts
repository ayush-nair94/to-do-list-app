import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotesViewService } from '../../state/notes-view.service';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';
import { filterUserNotesBySearchTerm } from '../../state/notes-view.helper';


@Component({
  selector: 'notes-home-view',
  templateUrl: './notes-home-view.component.html',
  styleUrls: ['./notes-home-view.component.scss']
})
export class NotesHomeViewComponent implements OnInit {

  userNotes: Array<IUserNote>;
  searchTerm: string;
  loading: boolean;
  activeTab: string;
  ngUnsubscriber: Subject<any> = new Subject<any>();

  constructor( private _notesSvc: NotesViewService) {
   this._notesSvc.dFetchUserNotes(JSON.parse(localStorage.getItem('userId')));
  }

  ngOnInit() {
    this._notesSvc.sGetUsersNote().pipe(takeUntil(this.ngUnsubscriber)).subscribe((data: Array<IUserNote>) => {
      this.userNotes = data;
      if(this.searchTerm != '') {
        this.userNotes = filterUserNotesBySearchTerm(this.searchTerm, _.cloneDeep(this.userNotes));
      }
    });
    this._notesSvc.sGetSearchTerm().pipe(takeUntil(this.ngUnsubscriber)).subscribe((term: string) => {
      this.searchTerm = term;
      if(this.searchTerm != '') {
        this.userNotes = filterUserNotesBySearchTerm(this.searchTerm, _.cloneDeep(this.userNotes));
      }
    });
    this._notesSvc.sGetViewLoading().pipe(takeUntil(this.ngUnsubscriber)).subscribe((flag: boolean) => {
      this.loading = flag;
    });
    this._notesSvc.sGetActiveTab().pipe(takeUntil(this.ngUnsubscriber)).subscribe((tab: string) => {
      this.activeTab = tab;
    });
  }

  add() {
    this._notesSvc.dSetAddEditViewState({flag: true, state: 'Add'});
  }

  setActiveTab(pTab: string) {
    this._notesSvc.dSetActiveTab(pTab);
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }


  get userNotesList() {
    if(this.activeTab.toLowerCase() == 'active') {
        return this.userNotes.filter(note => {
          if(note != null && note.status != null)
          return note.status.toLowerCase() == 'active';
        })
    } else {
      return this.userNotes.filter(note => {
        if(note != null && note.status != null)
        return note.status.toLowerCase() == 'inactive';
      })
    }
  }

  get activeNoteCount() {
    return this.userNotes.filter(note => {
      if(note != null && note.status != null)
      return note.status.toLowerCase() == 'active';
    }).length;
  }

  get inactiveNoteCount() {
    return this.userNotes.filter(note => {
      if(note != null && note.status != null)
      return note.status.toLowerCase() == 'inactive';
    }).length;
  }

}
