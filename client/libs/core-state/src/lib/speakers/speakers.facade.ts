import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromSpeakers from './speakers.reducer';
import * as SpeakersSelectors from './speakers.selectors';
import * as SpeakersActions from './speakers.actions';
import { Speaker } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class SpeakersFacade {
  speakerLoading$ = this.store.pipe(
    select(SpeakersSelectors.selectSpeakersLoading)
  );
  allSpeakers$ = this.store.pipe(select(SpeakersSelectors.selectAllSpeakers));
  selectedSpeaker$ = this.store.pipe(select(SpeakersSelectors.selectSpeaker));

  constructor(private store: Store<fromSpeakers.SpeakersPartialState>) {}

  selectSpeaker(selectedSpeakerId: string) {
    this.dispatch(SpeakersActions.speakerSelected({ selectedSpeakerId }));
  }

  loadAll() {
    this.dispatch(SpeakersActions.loadSpeakers());
  }

  createSpeaker(speaker: Speaker) {
    this.dispatch(SpeakersActions.createSpeaker({ speaker }));
  }

  updateSpeaker(speaker: Speaker) {
    this.dispatch(SpeakersActions.updateSpeaker({ speaker }));
  }

  deleteSpeaker(speaker: Speaker) {
    this.dispatch(SpeakersActions.deleteSpeaker({ speaker }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
