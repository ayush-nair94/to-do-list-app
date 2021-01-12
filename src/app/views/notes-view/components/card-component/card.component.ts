import {Component, ChangeDetectionStrategy, OnInit, Input} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs';

import { IUserNote } from '../../../../data-store/interfaces/IUserNote';
import { NotesViewService } from '../../state/notes-view.service';


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  ngUnsubscriber: Subject<any> = new Subject<any>();

  cardEntityDetail: IUserNote;

  constructor(private _notesSvc: NotesViewService) {
  }

  ngOnInit() {
    
  }

  viewNote() {
    this._notesSvc.dSetSelectedNote({data: this.cardEntityDetail, state: 'View'});
  }

  @Input()
  set cardData(pValue: IUserNote) {
    this.cardEntityDetail = pValue;
  }

  get updatedDate() {
      if(this.cardEntityDetail !== null && this.cardEntityDetail.updatedDate !== null && this.cardEntityDetail !== undefined && this.cardEntityDetail.updatedDate !== undefined) {
        let date = moment.utc(this.cardEntityDetail.updatedDate).local();
        return date.format('DD/MM/YYYY HH:mm:ss');
      } else {
          return '';
      }
  }

}
