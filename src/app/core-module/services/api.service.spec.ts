import { of } from 'rxjs';

import { AppDataStoreService } from "./api.service";
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';

describe('ApiService', () => {
    let apiService: AppDataStoreService;
    let mockHttpClient;

    beforeEach(function() {
        apiService = new AppDataStoreService(mockHttpClient);
    })

    it('should be createable', () => expect(apiService).toBeTruthy());

    it('should return notes of users', () => {
        let mockResponse = [
            {
                id: 1,
                userId: 1000,
                title: "Morning Stand-up tasks",
                body: "Developer 1 - will connect with Jam and sort upthe designing process.",
                media: "",
                mediaFormat: "",
                status: "active",
                createdDate: new Date('2021-01-12T20:20:28.642Z'),
                updatedDate: new Date('2021-01-12T20:20:28.642Z'),
                createdBy: "Ayush Nair",
                isDeleted: false
            },
            {
                id: 2,
                userId: 1000,
                title: "Client task syncup work",
                body: "Design the UI screens. Discuss the mockup",
                media: "",
                mediaFormat: "",
                status: "inactive",
                createdDate: new Date('2021-01-09T20:20:28.642Z'),
                updatedDate: new Date('2021-01-09T20:20:28.642Z'),
                createdBy: "Ayush Nair",
                isDeleted: false
            },
            {
                id: 3,
                userId: 1000,
                title: "Afternoon check-in status updates",
                body: "Developer 1 - Was able to complete the tasks alloted.\nDeveloper 2 - Still working on the spike.",
                media: "",
                mediaFormat: "",
                status: "active",
                createdDate: new Date('2021-01-03T20:20:28.642Z'),
                updatedDate: new Date('2021-01-03T20:20:28.642Z'),
                createdBy: "Ayush Nair",
                isDeleted: false
            }
        ];
        let response;
        spyOn(apiService, 'getNotesOfUsers').and.returnValue(of(mockResponse));
        apiService.getNotesOfUsers(1000).subscribe(res => { response = res });
        expect(response).toEqual(mockResponse);
    })

    it('should return users list', () => {
        let mockResponse = [
            {
                id: 1000,
                userName: "Ayush Nair",
                email: "ayush.test@gmail.com",
                password: "test"
            }
        ];
        let response;
        spyOn(apiService, 'getUsers').and.returnValue(of(mockResponse));
        apiService.getUsers().subscribe(res => { response = res });
        expect(response).toEqual(mockResponse);
    })

    it('should sign up new user', () => {
        let mockRequest =
            {
                id: 1000,
                userName: "Ayush Nair",
                email: "ayush.test@gmail.com",
                password: "test"
            };
        let mockId: number = 10;
        let response;
        spyOn(apiService, 'signUpUser').and.returnValue(of(mockId));
        apiService.signUpUser(mockRequest).subscribe(res => { response = res });
        expect(response).toEqual(mockId);
    })

    it('should add a new user note', () => {
        let mockRequest: IUserNote =
        {
            id: 3,
            userId: 1000,
            title: "Afternoon check-in status updates",
            body: "Developer 1 - Was able to complete the tasks alloted.\nDeveloper 2 - Still working on the spike.",
            media: "",
            mediaFormat: "",
            status: "active",
            createdDate: new Date('2021-01-03T20:20:28.642Z'),
            updatedDate: new Date('2021-01-03T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        };
        let mockId: number = 10;
        let response;
        spyOn(apiService, 'addNote').and.returnValue(of(mockId));
        apiService.addNote(mockRequest).subscribe(res => { response = res });
        expect(response).toEqual(mockId);
    })

    it('should edit a new user note', () => {
        let mockRequest: IUserNote =
        {
            id: 3,
            userId: 1000,
            title: "Afternoon check-in status updates",
            body: "Developer 1 - Was able to complete the tasks alloted.\nDeveloper 2 - Still working on the spike.",
            media: "",
            mediaFormat: "",
            status: "active",
            createdDate: new Date('2021-01-03T20:20:28.642Z'),
            updatedDate: new Date('2021-01-03T20:20:28.642Z'),
            createdBy: "Ayush Nair",
            isDeleted: false
        };
        let mockId: number = 10;
        let response;
        spyOn(apiService, 'editNote').and.returnValue(of(mockId));
        apiService.editNote(mockRequest).subscribe(res => { response = res });
        expect(response).toEqual(mockId);
    })

    it('should delete a new user note', () => {
        let mockId: number = 10;
        let response;
        spyOn(apiService, 'deleteNote').and.returnValue(of(true));
        apiService.deleteNote(mockId).subscribe(res => { response = res });
        expect(response).toEqual(true);
    })
});