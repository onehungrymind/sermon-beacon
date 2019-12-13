import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromSermons from './sermons.reducer';
import * as SermonsSelectors from './sermons.selectors';
import * as SermonsActions from './sermons.actions';
import { Sermon } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class SermonsFacade {
  sermonLoading$ = this.store.pipe(
    select(SermonsSelectors.selectSermonsLoading)
  );
  allSermons$ = this.store.pipe(select(SermonsSelectors.selectAllSermons));
  selectedSermon$ = this.store.pipe(select(SermonsSelectors.selectSermon));

  constructor(private store: Store<fromSermons.SermonsPartialState>) {}

  selectSermon(selectedSermonId: string) {
    this.dispatch(SermonsActions.selectedSermon({ selectedSermonId }));
  }

  loadSermons() {
    this.dispatch(SermonsActions.loadSermons());
  }

  createSermon(sermon: Sermon) {
    this.dispatch(SermonsActions.createSermon({ sermon }));
  }

  updateSermon(sermon: Sermon) {
    this.dispatch(SermonsActions.updateSermon({ sermon }));
  }

  deleteSermon(sermon: Sermon) {
    this.dispatch(SermonsActions.deleteSermon({ sermon }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
