import { Injectable } from '@angular/core';

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

  all(): Observable<SermonSpeaker[]> {
    return this.apollo.query({
      query: sermonSpeakersQuery,
      fetchPolicy: 'network-only'
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.speaker_sermons)
    );
  }
}
