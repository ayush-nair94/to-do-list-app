export interface IUserNote {
    id: number;
    userId: number;
    title: string;
    body: string;
    media: string;
    status: string;
    createdDate: Date;
    updatedDate: Date;
    createdBy: string;
    isDeleted: boolean;
}

export class UserNote {
    id: number;
    userId: number;
    title: string;
    body: string;
    media: string;
    status: string;
    createdDate: Date;
    updatedDate: Date;
    createdBy: string;
    isDeleted: boolean;

    constructor() {
        this.id = -1;
        this.userId = -1;
        this.title = "";
        this.body = "";
        this.media = "";
        this.status = "";
    }
}