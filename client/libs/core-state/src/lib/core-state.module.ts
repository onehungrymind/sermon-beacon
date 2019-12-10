import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreDataModule } from "@sb/core-data";
import { reducers } from '.';
import { SermonsEffects } from './sermons/sermons.effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      SermonsEffects,
    ]),
    StoreDevtoolsModule.instrument({name: 'SermonBeacon Store'}),
  ]
})
export class CoreStateModule {}
