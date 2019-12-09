import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromMedia from './media.reducer';
import * as MediaSelectors from './media.selectors';
import * as MediaActions from './media.actions';

@Injectable()
export class MediaFacade {
  loaded$ = this.store.pipe(select(MediaSelectors.getMediaLoaded));
  allMedia$ = this.store.pipe(select(MediaSelectors.getAllMedia));
  selectedMedia$ = this.store.pipe(select(MediaSelectors.getSelected));

  constructor(private store: Store<fromMedia.MediaPartialState>) {}

  loadAll() {
    this.store.dispatch(MediaActions.loadMedia());
  }
}
