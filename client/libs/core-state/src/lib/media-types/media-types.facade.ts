import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromMediaTypes from './media-types.reducer';
import * as MediaTypesSelectors from './media-types.selectors';
import * as MediaTypesActions from './media-types.actions';
import { MediaType } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class MediaTypesFacade {
  mediaTypeLoading$ = this.store.pipe(
    select(MediaTypesSelectors.selectMediaTypesLoading)
  );
  allMediaTypes$ = this.store.pipe(
    select(MediaTypesSelectors.selectAllMediaTypes)
  );
  selectedMediaType$ = this.store.pipe(
    select(MediaTypesSelectors.selectMediaType)
  );

  constructor(private store: Store<fromMediaTypes.MediaTypesPartialState>) {}

  selectMediaType(selectedMediaTypeId: string) {
    this.dispatch(MediaTypesActions.selectedMediaType({ selectedMediaTypeId }));
  }

  loadMediaTypes() {
    this.dispatch(MediaTypesActions.loadMediaTypes());
  }

  createMediaType(mediaType: MediaType) {
    this.dispatch(MediaTypesActions.createMediaType({ mediaType }));
  }

  updateMediaType(mediaType: MediaType) {
    this.dispatch(MediaTypesActions.updateMediaType({ mediaType }));
  }

  deleteMediaType(mediaType: MediaType) {
    this.dispatch(MediaTypesActions.deleteMediaType({ mediaType }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
