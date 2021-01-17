import * as _ from 'lodash';

import { UserActions } from './user.actions';
import { IAction } from '../../../core-module/app-store/interfaces/IAction';


/** Interface and Initial State */
export interface IUserState {
    routerUrl: string;
    signUpState: boolean;
}

export const DEFAULT_USER_STATE = {
    routerUrl: "",
    signUpState: false
};

/** Reducer */
export function user(state: IUserState = DEFAULT_USER_STATE, action: IAction): IUserState {
    switch (action.type) {

        case UserActions.USER_VALIDATED:
            return handleUserValidated(state, action);

        case UserActions.USER_SIGNED_UP:
            return handleUserSignedUp(state, action);

        case UserActions.SET_SIGN_UP_STATE:
            return handleSetSignUpState(state, action);
       
        default:
            return state;
    }

}

/** Reducer Handlers */

function handleUserValidated(state: IUserState, action: IAction): IUserState {
    let newState = _.cloneDeep(state);
    let name = action.payload.userName !== undefined && action.payload.userName !== "" ? action.payload.userName : "User Anony";
    localStorage.setItem('userName', JSON.stringify(name));
    localStorage.setItem('userId',JSON.stringify(action.payload.id) );
    newState.routerUrl = 'notes';
    return newState;
}

function handleUserSignedUp(state: IUserState, action: IAction): IUserState {
    let newState = _.cloneDeep(state);
    newState.signUpState = false;
    return newState;
}

function handleSetSignUpState(state: IUserState, action: IAction): IUserState {
    let newState = _.cloneDeep(state);
    newState.signUpState = action.payload;
    return newState;
}




