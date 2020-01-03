import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SermonSpeaker } from './sermon-speaker.model';
import { sermonSpeakersQuery } from './sermon-speakers.graphql';

@Injectable({
  providedIn: 'root'
})
export class SermonSpeakersService {

  constructor(private apollo: Apollo) { }

  all(query?: {searchQuery: string, searchType: string}): Observable<SermonSpeaker[]> {
    return this.apollo.query({
      query: sermonSpeakersQuery,
      fetchPolicy: 'network-only',
      variables: {
        titleQuery: {_ilike: !!query && query.searchType === 'title' ? `%${query.searchQuery}%` : '%%'},
        speakerNameQuery: {_ilike: !!query && query.searchType === 'speaker' ? `%${query.searchQuery}%` : '%%'},
        dateQuery: {_lte: !!query && query.searchType === 'date' ? moment(query.searchQuery).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')},
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.speaker_sermons)
    );
  }
}
