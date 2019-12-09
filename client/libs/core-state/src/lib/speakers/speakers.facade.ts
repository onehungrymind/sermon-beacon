import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromSpeakers from './speakers.reducer';
import * as SpeakersSelectors from './speakers.selectors';
import * as SpeakersActions from './speakers.actions';

@Injectable()
export class SpeakersFacade {
  loaded$ = this.store.pipe(select(SpeakersSelectors.getSpeakersLoaded));
  allSpeakers$ = this.store.pipe(select(SpeakersSelectors.getAllSpeakers));
  selectedSpeakers$ = this.store.pipe(select(SpeakersSelectors.getSelected));

  constructor(private store: Store<fromSpeakers.SpeakersPartialState>) {}

  loadAll() {
    this.store.dispatch(SpeakersActions.loadSpeakers());
  }
}
