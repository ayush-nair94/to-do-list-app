import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IUser } from '../views/login/models/IUser';
import { IUserNote } from './interfaces/IUserNote';

export class DataStoreInMemoryService implements InMemoryDbService {

  createDb() {
    const users : Array<IUser> = [
        {
            id: 1000,
            userName: "Ayush Nair",
            email: "ayush.test@gmail.com",
            password: "test"
        }
    ]
    const userNotes : Array<IUserNote> = [
        {
            id: 1,
            userId: 1000,
            title: "Morning Stand-up tasks",
            body: "Developer 1 - will connect with Jam and sort upthe designing process",
            media: "",
            status: "active",
            createdDate: new Date('2021-01-12T20:20:28.642Z'),
            updatedDate: new Date('2021-01-12T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        },
        {
            id: 2,
            userId: 1000,
            title: "test 2",
            body: "test 2",
            media: "",
            status: "inactive",
            createdDate: new Date('2021-01-09T20:20:28.642Z'),
            updatedDate: new Date('2021-01-09T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        },
        {
            id: 3,
            userId: 1000,
            title: "test 3",
            body: "test 3",
            media: "",
            status: "active",
            createdDate: new Date('2021-01-03T20:20:28.642Z'),
            updatedDate: new Date('2021-01-03T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        }
    ]
    return { users, userNotes } 
  }

}