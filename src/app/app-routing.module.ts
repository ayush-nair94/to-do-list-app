import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/index';


const appRoutes: Routes = [
  {path: 'notes', canActivate: [AuthGuard], loadChildren: 'app/views/notes-view/notes-view.module#NotesViewModule'},
  {path: '**', redirectTo: 'notes'}
];

export const routing = RouterModule.forRoot(appRoutes);

