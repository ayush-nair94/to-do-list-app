import {Component, ChangeDetectionStrategy} from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';

import { NotesViewService } from '../notes-view/state/notes-view.service';


@Component({
  selector: 'header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent {
  userName: string;
  searchInput: string;
  
  constructor(private _router: Router,
    private _notesSvc: NotesViewService) {
    this.userName = JSON.parse(localStorage.getItem('userName'));
  }

  search(pValue) {
    this._notesSvc.dSetSearchTerm(pValue);
  }

  logout() {
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      this._notesSvc.dResetStore();
      this._router.navigate(['login']);
  }
}
