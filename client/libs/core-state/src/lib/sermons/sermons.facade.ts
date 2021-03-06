import { Injectable } from '@angular/core';

import { Action, ActionsSubject, select, Store } from '@ngrx/store';

import * as fromSermons from './sermons.reducer';
import * as SermonsSelectors from './sermons.selectors';
import * as SermonsActions from './sermons.actions';
import { selectAggregatedSermon } from '..';
import { Sermon } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class SermonsFacade {
  allSermons$ = this.store.pipe(select(SermonsSelectors.selectAllSermons));
  selectedSermon$ = this.store.pipe(select(SermonsSelectors.selectSermon));
  aggregatedSermon$ = this.store.pipe(select(selectAggregatedSermon));
  sermonLoading$ = this.store.pipe(select(SermonsSelectors.selectSermonsLoading));

  constructor(
    private store: Store<fromSermons.SermonsPartialState>,
    private actions$: ActionsSubject
  ) {}

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

  cancelSermonMutation() {
    this.dispatch(SermonsActions.sermonMutationCancelled());
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
