import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Speaker } from './speaker.model';
import {
  createSpeakerMutation,
  deleteSpeakerMutation,
  sermonSpeakersQuery,
  speakerBySermonIdQuery,
  speakerQuery,
  updateSpeakerMutation,
} from './speakers.graphql';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {
  constructor(private apollo: Apollo) {}

  all(): Observable<Speaker[]> {
    return this.apollo.query({
      query: speakerQuery,
      fetchPolicy: 'network-only'
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.sermon_speakers_view)
    );
  }

  getSpeakerBySermonId(id: string) {
    return this.apollo.query({
      query: speakerBySermonIdQuery,
      fetchPolicy: 'network-only',
      variables: { id }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.sermon_speakers_view)
    );
  }

  allSermonSpeakers(): Observable<Speaker[]> {
    return this.apollo
      .query({
        query: sermonSpeakersQuery,
        fetchPolicy: 'network-only'
      })
      .pipe(map((res: ApolloQueryResult<any>) => res.data.speakers));
  }

  create(speaker: Partial<Speaker>) {
    delete speaker.id;
    delete speaker.created_at;
    delete speaker.updated_at;

    return this.apollo
      .mutate({
        mutation: createSpeakerMutation,
        variables: {
          objects: speaker
        }
      })
      .pipe(
        map(
          (res: ApolloQueryResult<any>) => res.data.insert_speakers.returning[0]
        )
      );
  }

  update(speaker: Partial<Speaker>) {
    delete (speaker as any).__typename;

    return this.apollo
      .mutate({
        mutation: updateSpeakerMutation,
        variables: {
          id: speaker.id,
          speaker
        }
      })
      .pipe(
        map(
          (res: ApolloQueryResult<any>) => res.data.update_speakers.returning[0]
        )
      );
  }

  delete(speaker: Partial<Speaker>) {
    return this.apollo
      .mutate({
        mutation: deleteSpeakerMutation,
        variables: {
          id: speaker.id
        }
      })
      .pipe(
        map(
          (res: ApolloQueryResult<any>) => res.data.delete_speakers.returning[0]
        )
      );
  }
}
