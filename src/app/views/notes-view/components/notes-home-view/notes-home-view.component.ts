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
  }

  add() {
    this._notesSvc.dSetAddEditViewState({flag: true, state: 'Add'});
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }

}
