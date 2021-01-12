/**
 * @module AppStoreService
 * @description
 * This service is used for registering action classes and selector functions from other modules, which
 * can be done by invoking the {@link registerActionClass} or {@link registerSelectors}
 *
 * After successful registration other service providers for smart/container components can use one of the
 * methods below to
 *
 * - dynamically dispatch actions, example:
 *
 *      dynamicDispatcher(pName: string, pPayload?: any) {
 *          this.appStoreSvc.dynamicDispatcher(ACTION_CLASS, pName, pPayload)
 *      }
 *
 * - retrieve collection object of selectors (by value or as observable):
 *
 *      getSelectorValues() {
 *          return this.appStoreSvc.generateSelectorValues('ActionSelectors', ['getAllActions'])
 *      }
 *
 * The purpose of this service is to create an abstraction layer for dispatching actions and retrieving selectors,
 * leaving almost no imports or boilerplate code left in our smart/container components and thus clearing the path
 * to easily manage our state in a modular way when components are generated dynamically.
 *
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { IAppStoreState } from './app-store.reducer';
import * as selector from './app-store.selectors';
import { AppActions } from './app-store.actions';

@Injectable()
export class AppStoreService implements OnDestroy {

    ngUnsubscribe: Subject<any> = new Subject<void>();
    globalActions = {};
    globalSelectors = {};

    /**
     * Registers ActionClass in globalActions
     *
     * Example:
     * globalActions = {
     *      ActionActions: {...pActionClass}
     * }
     *
     * @param pActionClass
     */

    registerActionClass(pActionClass: any) {
        const className: string = pActionClass.constructor.name;
        try {
            if(pActionClass && !this.globalActions[className]) {
                this.globalActions[className] = pActionClass;
            }
        } catch(e) {
            console.warn('registerActionClass', e);
        }
    }

    /**
     * Registers Selectors in globalSelectors
     *
     * Example:
     * globalSelectors = {
     *      ActionSelectors: * as selectors
     * }
     *
     * @param pRegisterName
     * @param pSelectors
     */
    registerSelectors(pRegisterName: string, pSelectors: any) {
        try {
            if(pSelectors && pRegisterName && !this.globalSelectors[pRegisterName]) {
                this.globalSelectors[pRegisterName] = pSelectors;
            }
        } catch(e) {
            console.warn('registerSelectors', e);
        }
    }

    /**
     * Takes string Selector identifier and Array of selector names, then returns a new object with
     * [key: selectorName] value: -selectorName$ (store selector observable)-
     *
     * @param pSelectorIdentifier
     * @param pSelectorsAPI
     */
    generateSelectors(pSelectorIdentifier: string, pSelectorsAPI: Array<string>) {
        let selectors: Object = {};
        try {
            selectors = pSelectorsAPI.reduce((tSelectors: Object, selector: string) => {
                tSelectors[selector] = this.getSelector(pSelectorIdentifier, selector);
                    return tSelectors;
            }, {});
        } catch(e) {
            console.warn('generateSelectors', e);
        }
        return selectors;
    }

    /**
     * Takes string Selector identifier and Array of selector names, then returns a new object with
     * [key: selectorName] value: -actual value recieved from the store after subscribing-
     *
     * @param pSelectorIdentifier
     * @param pSelectorsAPI
     */
    generateSelectorValues(pSelectorIdentifier: string, pSelectorsAPI: Array<string>) {
        let selectors: Object = {};
        try {
            selectors = pSelectorsAPI.reduce((tSelectors: Object, selector: string) => {
                this.getSelector(pSelectorIdentifier, selector).subscribe((returnValue: any) => {
                    tSelectors[selector] = returnValue;
                });
                return tSelectors;
            }, {});
        } catch(e) {
            console.warn('generateSelectorValues', e);
        }
        return selectors;
    }

    /**
     * Takes string Selector identifier and string Selector name,
     * then retrieves Selector Observable from the Store
     *
     * @param pSelectorIdentifier
     * @param pSelector
     */
    getSelector(pSelectorIdentifier: string, pSelector: string): Observable<any> {
        let selector$: Observable<any> = new Observable;
        try {
            if(pSelectorIdentifier && pSelector && this.globalSelectors[pSelectorIdentifier] && this.globalSelectors[pSelectorIdentifier][pSelector]) {
                selector$ = this.store.select(this.globalSelectors[pSelectorIdentifier][pSelector]);
            }
        } catch(e) {
            console.warn('dynamicSelector', e);
        }
        return selector$;
    }


    /**
     * Takes string Action ClassName, string Action name and optional payload
     * Checks if the Action class is registered
     * If true it will dispatch the Action to the Store
     *
     * @param pActionClassName
     * @param pAction
     * @param pPayload
     */
    dynamicDispatcher(pActionClassName: string, pAction: string, pPayload?: any) {
        try {
            if(String === pAction.constructor && this.globalActions[pActionClassName] && this.globalActions[pActionClassName][pAction]) {
                this.store.dispatch(this.globalActions[pActionClassName][pAction](pPayload));
            }
        } catch (e) {
            console.warn('dynamicDispatcher', e);
        }
    }


    /**
     * Takes string Action ClassName and array of string Action name,
     * loops over the array and checks if the Action Class is registered
     * If true it will dispatch the Action to the Store
     *
     * @param pActionClassName
     * @param pActions
     */
    dispatchBatch(pActionClassName: string, pActions: Array<string>) {
        try {
            if(pActions && Array === pActions.constructor && this.globalActions[pActionClassName]) {
                pActions.forEach((pAction, i) => {
                    if(this.globalActions[pActionClassName][pAction]) {
                        this.store.dispatch( this.globalActions[pActionClassName][pAction]() );
                    }
                });
            }
        } catch(e) {
            console.warn('dispatchBatch', e);
        }
    }


    /**
     * Takes any subject and executes its next and complete class methods,
     * in other words any open streams gets terminated
     *
     * @param pSubscription
     */
    unSubscribe(pSubscription: Subject<any>) {
        try {
            pSubscription.next();
            pSubscription.complete();
        } catch(e) {
            console.warn('unSubscribe', e);
        }
    }

    /**
     * Calls the unSubscribe method to terminate all open streams to
     * avoid memory leaks
     *
     * (Only useful if the service is not shared)
     */
    ngOnDestroy() {
        try {
            this.unSubscribe(this.ngUnsubscribe);
        } catch(e) {
            console.warn('ngOnDestroy', e);
        }
    }

    constructor(public store: Store<IAppStoreState>,
        public actions: AppActions
        ) {
        this.registerActionClass(actions);
        this.registerSelectors('AppSelectors', selector)
    }
}
