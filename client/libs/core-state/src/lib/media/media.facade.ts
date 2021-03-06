import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromMedia from './media.reducer';
import * as MediaSelectors from './media.selectors';
import * as MediaActions from './media.actions';
import { Media } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class MediaFacade {
  allMedia$ = this.store.pipe(select(MediaSelectors.selectAllMedia));
  selectedMedia$ = this.store.pipe(select(MediaSelectors.selectMedia));
  mediaLoading$ = this.store.pipe(select(MediaSelectors.selectMediaLoading));
  videoMedia$ = this.store.pipe(select(MediaSelectors.selectVideoMedia));

  constructor(private store: Store<fromMedia.MediaPartialState>) {}

  selectMedia(selectedMediaId: string) {
    this.dispatch(MediaActions.mediaSelected({ selectedMediaId }));
  }

  loadMedia() {
    this.dispatch(MediaActions.loadMedia());
  }

  loadMediaBySermonId(sermonId: string) {
    this.dispatch(MediaActions.loadMediaBySermonId({ sermonId }));
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

  deleteMediaBySermonId(sermonId: string) {
    this.dispatch(MediaActions.deleteMediaBySermonId({ sermonId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
