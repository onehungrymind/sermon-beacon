import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSpeakers from './speakers.reducer';
import * as SpeakersSelectors from './speakers.selectors';
import * as SpeakersActions from './speakers.actions';
import { Speaker } from '@sb/core-data';

@Injectable({providedIn: 'root'})
export class SpeakersFacade {
  loaded$ = this.store.pipe(select(SpeakersSelectors.getSpeakersLoading));
  allSpeakers$ = this.store.pipe(select(SpeakersSelectors.getAllSpeakers));
  selectedSpeakers$ = this.store.pipe(select(SpeakersSelectors.getSelected));

  constructor(private store: Store<fromSpeakers.SpeakersPartialState>) {}

  selectSpeaker(selectedSpeakerId: string) {
    this.dispatch(SpeakersActions.selectSpeaker({ selectedSpeakerId }));
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
