import { IUserNote } from "src/app/data-store/interfaces/IUserNote";
import { parseDataForSave, filterUserNotesBySearchTerm } from './notes-view.helper';

describe("NotesViewHelper", () => {
    it("should test parsing of data for save", () => {
        const parsedData: IUserNote = {
                id: 1,
                userId: 1000,
                title: 'test',
                body: 'test',
                media: '',
                mediaFormat: 'image',
                status: 'active',
                createdDate: new Date(),
                updatedDate: new Date(),
                createdBy: 'testUser',
                isDeleted: false
        }
        const response = parseDataForSave(parsedData, 'add');
        expect(response).toEqual(parsedData);
    });

    it("should test filtering of notes based on search term", () => {
        const userNotes: Array<IUserNote> = [
            {
                id: 1,
                userId: 1000,
                title: 'test',
                body: 'test',
                media: '',
                mediaFormat: 'image',
                status: 'active',
                createdDate: new Date(),
                updatedDate: new Date(),
                createdBy: 'testUser',
                isDeleted: false
            },
            {
                id: 2,
                userId: 1000,
                title: 'mock note',
                body: 'mock note',
                media: '',
                mediaFormat: 'image',
                status: 'active',
                createdDate: new Date(),
                updatedDate: new Date(),
                createdBy: 'testUser',
                isDeleted: false
            }
        ]
        const expectedResult: Array<IUserNote> = [
            {
                id: 2,
                userId: 1000,
                title: 'mock note',
                body: 'mock note',
                media: '',
                mediaFormat: 'image',
                status: 'active',
                createdDate: new Date(),
                updatedDate: new Date(),
                createdBy: 'testUser',
                isDeleted: false
            }
        ]
        const response = filterUserNotesBySearchTerm('mock', userNotes);
        expect(expectedResult).toEqual(response);
    });
})