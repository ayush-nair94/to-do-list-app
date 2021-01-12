import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUserNote } from '../../data-store/interfaces/IUserNote';
import { IUser } from '../../views/login/models/IUser';



@Injectable({
    providedIn: 'root'
})

export class AppDataStoreService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) {
  }

   public getNotesOfUsers(pId: number) {
       return this.httpClient.get(this.SERVER_URL + 'userNotes');
   }

   public getUsers() {
       return this.httpClient.get(this.SERVER_URL + 'users');
   }

   public signUpUser(pData: IUser) {
       return this.httpClient.post(`${this.SERVER_URL + 'users'}`, pData)
   }

   public addNote(pData: IUserNote) {
       return this.httpClient.post(`${this.SERVER_URL + 'userNotes'}`, pData)
   }

   public editNote(pData: IUserNote) {
       return this.httpClient.put(`${this.SERVER_URL + 'userNotes'}/${pData.id}`, pData)
   }

   public deleteNote(pId: number) {
       return this.httpClient.delete(`${this.SERVER_URL + 'userNotes'}/${pId}`)
   }
}

