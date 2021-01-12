import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { HttpClientModule } from '@angular/common/http'

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesViewModule } from './views/notes-view/notes-view.module';
import { AppStoreModule } from './core-module/app-store';
import { AlertModule } from './core-module/alert/alert.module';
import { AppDataStoreService } from './core-module/services/api.service';
import { DataStoreInMemoryService } from './data-store/data-store-in-memory.service'
import { LoginModule } from './views/login/login.module';
import { AuthGuard } from './guards';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppStoreModule,
    AlertModule,
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule,
    routing,
    NotesViewModule,
    HttpClientInMemoryWebApiModule.forRoot(DataStoreInMemoryService)
  ],
  providers: [AuthGuard, AppDataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
