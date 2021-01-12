export interface IExistingUser {
    email: string;
    password: string;
}

export class ExistingUser implements IExistingUser {
    email: string;
    password: string;

    constructor() {
    }
}

export interface INewUser {
    userName: string;
    email: string;
    password: string;
    verifyPassword: string;
}


export class NewUser implements INewUser {
    userName: string;
    email: string;
    password: string;
    verifyPassword: string;

    constructor() {
    }
}


export interface IUser {
    id: number
    userName: string;
    email: string;
    password: string;
}


export class User implements IUser {
    id: number;
    userName: string;
    email: string;
    password: string;

    constructor() {
    }
}