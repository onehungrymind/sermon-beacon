import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromSermons from './sermons.reducer';
import * as SermonsSelectors from './sermons.selectors';
import * as SermonsActions from './sermons.actions';

@Injectable()
export class SermonsFacade {
  loaded$ = this.store.pipe(select(SermonsSelectors.getSermonsLoaded));
  allSermons$ = this.store.pipe(select(SermonsSelectors.getAllSermons));
  selectedSermons$ = this.store.pipe(select(SermonsSelectors.getSelected));

  constructor(private store: Store<fromSermons.SermonsPartialState>) {}

  loadAll() {
    this.store.dispatch(SermonsActions.loadSermons());
  }
}
