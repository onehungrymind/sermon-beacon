import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromSermonSpeakers from './sermon-speakers.reducer';
import * as sermonSpeakersActions from './sermon-speakers.actions';
import * as sermonSpeakersSelectors from './sermon-speakers.selectors';
import { SermonSpeaker } from '@sb/core-data';

@Injectable({
  providedIn: 'root'
})
export class SermonSpeakersFacade {
  allSermonSpeakers$ = this.store.pipe(select(sermonSpeakersSelectors.selectAllSermonSpeakers));
  selectedSermonSpeaker$ = this.store.pipe(select(sermonSpeakersSelectors.selectSermonSpeaker));
  sermonSpeakerLoading$ = this.store.pipe(select(sermonSpeakersSelectors.selectSermonSpeakersLoading));

  constructor(private store: Store<fromSermonSpeakers.SermonSpeakersPartialState>) {}

  selectSermonSpeaker(selectedSermonSpeakerId: string) {
    this.dispatch(sermonSpeakersActions.sermonSpeakerSelected({ selectedSermonSpeakerId }));
  }

  loadSermonSpeakers() {
    this.dispatch(sermonSpeakersActions.loadSermonSpeakers());
  }

  searchSermons(query?: {searchQuery: string, searchType: string}) {
    this.dispatch(sermonSpeakersActions.searchSermons({ query }));
  }

  createSermonSpeaker(sermonSpeaker: SermonSpeaker) {
    this.dispatch(sermonSpeakersActions.createSermonSpeaker({ sermonSpeaker }));
  }

  updateSermonSpeaker(sermonSpeaker: SermonSpeaker) {
    this.dispatch(sermonSpeakersActions.updateSermonSpeaker({ sermonSpeaker }));
  }

  deleteSermonSpeaker(sermonSpeaker: SermonSpeaker) {
    this.dispatch(sermonSpeakersActions.deleteSermonSpeaker({ sermonSpeaker }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
