import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IAction } from '../interfaces/IAction';

@Injectable()
export class ApplicationEffects {

    @Effect()
    eError$ = this.action$.pipe(
        ofType('ERROR'),
        switchMap((pAction: IAction) => {
            return EMPTY;
        })
    )
        // .ofType('ERROR')
        // .switchMap((pAction: IAction) => {
        //         return Observable.empty();
        //     }
        // );

    constructor(private action$: Actions) {
    }
}


export const error = (e: any): Observable<any> => {
    return of({type: "ERROR", payload: e});
};
