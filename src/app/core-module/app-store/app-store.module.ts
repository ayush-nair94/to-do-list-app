import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MainReducer} from './state/app-store.reducer';
import { ApplicationEffects } from './state/app-store.effects';
import { AppStoreService } from './state/app-store.service';
import { AppActions } from './state/app-store.actions';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([]),
        EffectsModule.forRoot([ApplicationEffects]),
        StoreModule.forRoot(MainReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        }),
    ],
    declarations: [],
    providers: [
        AppStoreService,
        AppActions
    ],
    exports: [],
    entryComponents: [

    ]
})
export class AppStoreModule {}
