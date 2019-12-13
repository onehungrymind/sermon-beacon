import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromSermons from './sermons.reducer';
import * as SermonsSelectors from './sermons.selectors';
import * as SermonsActions from './sermons.actions';
import { Sermon } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class SermonsFacade {
  loading$ = this.store.pipe(select(SermonsSelectors.getSermonsLoading));
  allSermons$ = this.store.pipe(select(SermonsSelectors.getAllSermons));
  selectedSermons$ = this.store.pipe(select(SermonsSelectors.getSelected));

  constructor(private store: Store<fromSermons.SermonsPartialState>) {}

  selectSermon(selectedSermonId: string) {
    this.dispatch(SermonsActions.sermonSelected({ selectedSermonId }));
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
