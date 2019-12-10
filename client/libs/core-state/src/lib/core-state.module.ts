import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDataModule } from "@sb/core-data";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SermonsEffects } from './sermons/sermons.effects';
import { SermonsFacade } from './sermons/sermons.facade';
import { reducers } from '.';

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      SermonsEffects,
    ]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    SermonsFacade,
  ]
})
export class CoreStateModule {}
