import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {trigger, state, transition, style, animate } from '@angular/animations';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { NotesViewService } from '../../state/notes-view.service';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';
import { parseDataForSave } from '../../state/notes-view.helper';


@Component({
  selector: 'notes-add-edit-view',
  templateUrl: './notes-add-edit-view.component.html',
  styleUrls: ['./notes-add-edit-view.component.scss'],
  animations: [
    trigger('slideInOut', [
        transition(':enter', [
          style({
              transform: 'scale(0.1)',
              top: '300px',
              opacity: '0',
              transition: 'all 0.3s'
          }),
          animate('200ms ease-in', style({
              transform: 'translate3d(0, 0, 0)',
              opacity: '1',
              transition: 'all 0.3s'
          }))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
      ])
  ]
})

export class NotesAddEditViewComponent implements OnInit{
    showModal: boolean;
    state: string;
    url: string;
    format: string;
    selectedNote: IUserNote;
    ngUnsubscriber: Subject<any> = new Subject<any>();

    constructor(private _notesSvc: NotesViewService, private _router: Router) {
    }

    ngOnInit() {
      this._notesSvc.sGetAddEditViewState().pipe(takeUntil(this.ngUnsubscriber)).subscribe((flag: boolean) => {
        if(this.showModal && !flag) {
            this._router.navigate(['notes/']);
        }
        this.showModal = flag;
      });
      this._notesSvc.sGetFormState().pipe(takeUntil(this.ngUnsubscriber)).subscribe((data: string) => {
          this.state = data;
      });
      this._notesSvc.sGetSelectedNote().pipe(takeUntil(this.ngUnsubscriber)).subscribe((data: IUserNote) => {
          this.selectedNote = _.cloneDeep(data);
      });
    }

    hideModal() {
        this._notesSvc.dSetAddEditViewState({ flag: false, state: ''});
        this._router.navigate(['notes/']);
    }

    saveNote() {
        this.state.toLowerCase() == 'add' ? this._notesSvc.dSaveNote(parseDataForSave(this.selectedNote, this.state)) : this._notesSvc.dEditNote(parseDataForSave(this.selectedNote, this.state));
    }

    editNote() {
        this._notesSvc.dSetAddEditViewState({ flag: true, state: 'Edit'});
    }

    deactivateNote() {
        this.selectedNote.status = "inactive";
        this._notesSvc.dEditNote(parseDataForSave(this.selectedNote, this.state));
    }

    activateNote() {
        this.selectedNote.status = "active";
        this._notesSvc.dEditNote(parseDataForSave(this.selectedNote, this.state));
    }

    onSelectFile(event) {
        const file = event.target.files && event.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          if (file.type.indexOf("image") > -1) {
            this.selectedNote.mediaFormat = "image";
          } else if (file.type.indexOf("video") > -1) {
            this.selectedNote.mediaFormat = "video";
          }
          reader.onload = event => {
            this.selectedNote.media = (<FileReader>event.target).result.toString();
          };
        }
      }

    ngOnDestroy() {
        this.ngUnsubscriber.next();
        this.ngUnsubscriber.complete();
    }

    get updatedDate() {
        if(this.selectedNote !== undefined && this.selectedNote.updatedDate !== undefined) {
          let date = moment.utc(this.selectedNote.updatedDate).local();
          return date.format('DD/MM/YYYY HH:mm:ss');
        } else {
            return '';
        }
    }

    get createdDate() {
        if(this.selectedNote !== undefined && this.selectedNote.createdDate !== undefined) {
          let date = moment.utc(this.selectedNote.createdDate).local();
          return date.format('DD/MM/YYYY HH:mm:ss');
        } else {
            return '';
        }
    }
}

