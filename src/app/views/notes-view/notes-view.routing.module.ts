import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {NgModule} from '@angular/core';
import { NotesAddEditViewComponent } from './components/notes-add-edit-view/notes-add-edit-view.component';
import { NotesHomeViewComponent } from './components/notes-home-view/notes-home-view.component';


const notesViewRoutes: Routes = [
  {
    path: '',
    component: NotesHomeViewComponent,
    children : [
       { path: 'add', canActivate: [AuthGuard], component: NotesAddEditViewComponent},
       { path: ':id', canActivate: [AuthGuard], component: NotesAddEditViewComponent,
         children: [
          { path: 'edit', canActivate: [AuthGuard], component: NotesAddEditViewComponent},
          { path: 'view', canActivate: [AuthGuard], component: NotesAddEditViewComponent}
         ]
       }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(notesViewRoutes)],
  exports: [RouterModule]
})

export class NotesViewRoutingModule { }