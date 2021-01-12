import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NotesViewService } from './state/notes-view.service';
import { NotesHomeViewComponent } from './components/notes-home-view/notes-home-view.component';
import { CardComponent } from './components/card-component/card.component';
import { NotesAddEditViewComponent } from './components/notes-add-edit-view/notes-add-edit-view.component';
import { NotesViewActions } from './state/notes-view.actions';
import { notesView } from './state/notes-view.reducer';
import { NotesViewEffects } from './state/notes-view.effects';
import { NotesViewRoutingModule } from './notes-view.routing.module';
import { HeaderViewComponent } from '../header-view/header-view.component';

@NgModule({
  declarations: [
    NotesHomeViewComponent,
    NotesAddEditViewComponent,
    CardComponent,
    HeaderViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('notes', notesView),
    EffectsModule.forFeature([NotesViewEffects]),
    FormsModule,
    NotesViewRoutingModule
  ],
  providers: [
    NotesViewService,
    NotesViewActions
  ],
  exports: [ ]
})
export class NotesViewModule {
}
