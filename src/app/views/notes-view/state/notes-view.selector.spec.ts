import * as fromSelectors from './notes-view.selector';
import { INotesViewState } from './notes-view.reducer';
import { IUserNote } from 'src/app/data-store/interfaces/IUserNote';

describe('NotesSelectors', () => {
    let notesViewState: INotesViewState;
    beforeEach(() => {
         notesViewState = {
            userNotes: [ {
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
            }],
            selectedNote: {
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
            addEditViewState: false,
            formState: 'Edit',
            searchTerm: 'search',
            viewLoading: false,
            activeTab: 'active'
        }
    });

    it('should select the user notes', () => {
        const userNotes:  Array<IUserNote> = [
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
            }
        ]
        const result = fromSelectors.getUserNotes.projector(notesViewState);
        expect(result).toEqual(userNotes);
        //expect(result[0].id).toEqual(1);
    });

    it('should select the selected note', () => {
        const userNote: IUserNote = {
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
        }
        const result = fromSelectors.getSelectedNote.projector(notesViewState);
        expect(result).toEqual(userNote);
        expect(result.id).toEqual(1);
    });

    it('should select the add edit view state', () => {
        const state: boolean = false;
        const result = fromSelectors.getAddEditViewState.projector(notesViewState);
        expect(result).toEqual(state);
    });

    it('should select the form state', () => {
        const state: string = 'Edit';
        const result = fromSelectors.getFormState.projector(notesViewState);
        expect(result).toEqual(state);
    });

    it('should select the search term', () => {
        const term: string = 'search';
        const result = fromSelectors.getSearchTerm.projector(notesViewState);
        expect(result).toEqual(term);
    });

    it('should select the view loading flag', () => {
        const flag: boolean = false;
        const result = fromSelectors.getViewLoading.projector(notesViewState);
        expect(result).toEqual(flag);
    });

    it('should select the active tab', () => {
        const activeTab: string = 'active';
        const result = fromSelectors.getActiveTab.projector(notesViewState);
        expect(result).toEqual(activeTab);
    });
});
