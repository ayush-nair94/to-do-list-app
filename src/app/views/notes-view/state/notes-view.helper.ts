import * as moment from 'moment';

import { IUserNote, UserNote } from '../../../data-store/interfaces/IUserNote';

export function parseDataForSave(pData: IUserNote, pState: string) {
    let date = new Date();
    if(pState.toLowerCase() == 'add') {
        pData.createdBy = JSON.parse(localStorage.getItem('userName'));
        pData.createdDate = date;
    }
    pData.updatedDate = date;
    pData.isDeleted = false;
    pData.status = "active";
    pData.userId = JSON.parse(localStorage.getItem('userId'));
    pData.media = "";
    return pData;
}

export function filterUserNotesBySearchTerm(pTerm: string, pUserNotes: Array<IUserNote>) {
    pUserNotes = pUserNotes.filter(note => {
        return note.title.includes(pTerm) || note.body.includes(pTerm) || moment.utc(note.updatedDate).local().format('DD/MM/YYYY HH:mm:ss').includes(pTerm) || moment.utc(note.createdDate).local().format('DD/MM/YYYY HH:mm:ss').includes(pTerm);
    });
    return pUserNotes
}