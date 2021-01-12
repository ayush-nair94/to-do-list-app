import * as fromRouter from '@ngrx/router-store';
import * as _ from 'lodash';

import { INotesViewState } from '../../../views/notes-view/state/notes-view.reducer';
import { IUserState } from '../../../views/login/state/user.reducer';




export interface IAppStoreState {
    notes: INotesViewState;
    user: IUserState;
}

export const DEFAULT_APP_STORE_STATE = { };

/** Reducer */
export function appstore(state: any = DEFAULT_APP_STORE_STATE, action: any) {
    switch (action.type) {


        default:
            return state;
    }
}


export const MainReducer = {
    routerReducer: fromRouter.routerReducer,
    appStore: appstore
};


