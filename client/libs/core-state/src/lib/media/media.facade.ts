import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromMedia from './media.reducer';
import * as MediaSelectors from './media.selectors';
import * as MediaActions from './media.actions';
import { Media } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class MediaFacade {
  mediaLoading$ = this.store.pipe(select(MediaSelectors.selectMediaLoading));
  allMedia$ = this.store.pipe(select(MediaSelectors.selectAllMedia));
  selectedMedia$ = this.store.pipe(select(MediaSelectors.selectMedia));

  constructor(private store: Store<fromMedia.MediaPartialState>) {}

  selectMedia(selectedMediaId: string) {
    this.dispatch(MediaActions.selectedMedia({ selectedMediaId }));
  }

  loadMedia() {
    this.dispatch(MediaActions.loadMedia());
  }

  createMedia(media: Media) {
    this.dispatch(MediaActions.createMedia({ media }));
  }

  updateMedia(media: Media) {
    this.dispatch(MediaActions.updateMedia({ media }));
  }

  deleteMedia(media: Media) {
    this.dispatch(MediaActions.deleteMedia({ media }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
