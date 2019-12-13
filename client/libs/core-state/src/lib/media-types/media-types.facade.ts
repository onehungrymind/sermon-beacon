import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromMediaTypes from './media-types.reducer';
import * as MediaTypesSelectors from './media-types.selectors';
import * as MediaTypesActions from './media-types.actions';
import { MediaType } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class MediaTypesFacade {
  mediaTypeLoading$ = this.store.pipe(
    select(MediaTypesSelectors.getMediaTypesLoading)
  );
  allMediaTypes$ = this.store.pipe(
    select(MediaTypesSelectors.getAllMediaTypes)
  );
  selectedMediaType$ = this.store.pipe(select(MediaTypesSelectors.getSelected));

  constructor(private store: Store<fromMediaTypes.MediaTypesPartialState>) {}

  selectMediaType(selectedMediaTypeId: string) {
    this.dispatch(MediaTypesActions.selectedMedia({ selectedMediaTypeId }));
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
