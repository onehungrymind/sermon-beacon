import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  createSermonMutation,
  deleteSermonMutation,
  sermonQuery,
  updateSermonMutation
} from './sermons.graphql';
import { Sermon } from './sermon.model';

@Injectable({
  providedIn: 'root'
})
export class SermonsService {
  constructor(private apollo: Apollo) {}

  all(query?: {searchQuery: string, searchType: string}): Observable<Sermon[]> {
    return this.apollo
      .query({
        query: sermonQuery,
        fetchPolicy: 'network-only',
        variables: {
          titleQuery: {_ilike: !!query && query.searchType === 'title' ? `%${query.searchQuery}%` : '%%'},
          speakerNameQuery: {_ilike: !!query && query.searchType === 'speaker' ? `%${query.searchQuery}%` : '%%'},
          dateQuery: {_lte: !!query && query.searchType === 'date' ? moment(query.searchQuery).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')},
        }
      })
      .pipe(map((response: ApolloQueryResult<any>) => response.data.speaker_sermons_view));
  }

  create(sermon: Partial<Sermon>) {
    delete sermon.id;
    delete sermon.date;
    delete sermon.created_at;
    delete sermon.updated_at;

    return this.apollo
      .mutate({
        mutation: createSermonMutation,
        variables: {
          objects: sermon
        }
      })
      .pipe(
        map(
          (response: ApolloQueryResult<any>) =>
            response.data.insert_sermons.returning[0]
        )
      );
  }

  update(sermon: Partial<Sermon>) {
    delete (sermon as any).__typename;

    return this.apollo
      .mutate({
        mutation: updateSermonMutation,
        variables: {
          id: sermon.id,
          sermon
        }
      })
      .pipe(
        map(
          (response: ApolloQueryResult<any>) =>
            response.data.update_sermons.returning[0]
        )
      );
  }

  delete(sermon: Partial<Sermon>) {
    return this.apollo
      .mutate({
        mutation: deleteSermonMutation,
        variables: {
          id: sermon.id
        }
      })
      .pipe(
        map(
          (response: ApolloQueryResult<any>) =>
            response.data.delete_sermons.returning[0]
        )
      );
  }
}
