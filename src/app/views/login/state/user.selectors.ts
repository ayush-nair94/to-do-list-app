import { IAppStoreState } from "../../../core-module/app-store";
import { createSelector } from '@ngrx/store';
import { IUserState } from './user.reducer';


export const userFeature = (state: IAppStoreState) => state.user;
 
export const getRouterUrl = createSelector(
    userFeature,
  (state: IUserState) => state.routerUrl
);

export const getSignUpState = createSelector(
    userFeature,
  (state: IUserState) => state.signUpState
);
