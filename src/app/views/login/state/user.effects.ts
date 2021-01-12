import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of, concat } from "rxjs";
import { Action } from '@ngrx/store';

import { IAction } from "../../../core-module/app-store/interfaces/IAction";
import { AppDataStoreService } from 'src/app/core-module/services/api.service';
import * as UserActions from './user.actions';
import { IUser } from '../models/IUser';
import { AlertService } from 'src/app/core-module/alert/alert.service';

@Injectable()
export class UserEffects {
    constructor( private actions$: Actions,
                private _dataStoreApi: AppDataStoreService,
                private _alertSvc: AlertService) {

                }


    eLoginUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.UserActions.LOGIN_USER),
      switchMap((pAction: IAction) =>{
            return concat (
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: true}),
                this._dataStoreApi.getUsers()
                    .pipe(
                        switchMap((data: Array<IUser>) => {
                            let userDetails: IUser;
                            data.map(user => {
                                if(pAction.payload.email.toLowerCase() == user.email.toLowerCase() && pAction.payload.password.toLowerCase() == user.password.toLowerCase()) {
                                    userDetails = user;
                                }
                            });
                            if(userDetails && userDetails.email && userDetails.userName) {
                                return of({type: '[User] USER_VALIDATED', payload: userDetails})
                            } else {
                                this._alertSvc.error('Wrong Username or Password! Please try again');
                                return EMPTY;
                                //error message
                            }
                        })
                    ),
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: false})
            )
       })
    ));


    eSignUpUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.UserActions.SIGN_UP_USER),
      switchMap((pAction: IAction) =>{
            return concat (
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: true}),
                // this._dataStoreApi.signupUser(pAction.payload)
                //     .pipe(
                //         switchMap((data: boolean) => {
                //             if(data) {
                //                 return of({type: '[User] USER_SIGNED_UP', payload: data})
                //             } else {
                //                 //error message
                //             }
                //         })
                //     ),
                this._dataStoreApi.getUsers()
                    .pipe(
                        switchMap((data: Array<IUser>) => {
                            let userAlreadyExists: boolean = false;
                            data.map(user => {
                                if(pAction.payload.email.toLowerCase() == user.email.toLowerCase()) {
                                    userAlreadyExists = true;
                                }
                            });
                            if(userAlreadyExists) {
                               this._alertSvc.error('User already registered in with same EmailId! Please use a new one.')
                               return EMPTY;
                            } else {
                                let newUserData: IUser = {
                                    id: data.length > 0 ? data[data.length - 1].id + 1 : 1000,
                                    userName: pAction.payload.userName,
                                    email: pAction.payload.email,
                                    password: pAction.payload.password
                                };
                                return this._dataStoreApi.signUpUser(pAction.payload)
                                    .pipe(
                                        switchMap((data: boolean) => {
                                        if(data) {
                                            this._alertSvc.success('User successfully registered. Please login with credentials');
                                            return of({type: '[User] USER_SIGNED_UP', payload: data})
                                        } else {
                                            this._alertSvc.error('User registration failed. Please try again.')
                                            return EMPTY;
                                        }
                                    })
                                )
                            }
                        })
                    ),
                //of({type: '[NOTES_VIEW] SET_VIEW_LOADING', payload: false})
            )
       })
    ));
}