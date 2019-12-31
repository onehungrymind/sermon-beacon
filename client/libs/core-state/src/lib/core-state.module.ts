import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreDataModule } from '@sb/core-data';
import { MediaEffects } from './media/media.effects';
import { MediaTypesEffects } from './media-types/media-types.effects';
import { reducers } from '.';
import { SermonsEffects } from './sermons/sermons.effects';
import { SermonSpeakersEffects } from './sermon-speakers/sermon-speakers.effects';
import { SpeakersEffects } from './speakers/speakers.effects';
import { TagsEffects } from './tags/tags.effects';

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
      MediaEffects,
      MediaTypesEffects,
      SermonsEffects,
      SermonSpeakersEffects,
      SpeakersEffects,
      TagsEffects,
    ]),
    StoreDevtoolsModule.instrument({ name: 'SermonBeacon Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
