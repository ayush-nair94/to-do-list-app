import { IUserNote } from '../../../data-store/interfaces/IUserNote';

export interface ISelectedNote {
    data: IUserNote;
    state: string;
}