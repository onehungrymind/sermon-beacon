import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDataModule } from "@sb/core-data";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SermonsEffects } from './sermons/sermons.effects';
import { SermonsFacade } from './sermons/sermons.facade';
import { SpeakersEffects } from './speakers/speakers.effects';
import { SpeakersFacade } from './speakers/speakers.facade';
import { TagsEffects } from './tags/tags.effects';
import { TagsFacade } from './tags/tags.facade';
import { MediaEffects } from './media/media.effects';
import { MediaFacade } from './media/media.facade';
import { reducers } from '.';

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      SermonsEffects,
      SpeakersEffects,
      TagsEffects,
      MediaEffects
    ]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    SermonsFacade,
    SpeakersFacade,
    TagsFacade,
    MediaFacade
  ]
})
export class CoreStateModule {}
