import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  createSermonSpeakerMutation,
  createSpeakerMutation,
  deleteSermonSpeakersMutation,
  deleteSpeakerMutation,
  sermonSpeakersQuery,
  speakerBySermonIdQuery,
  speakerQuery,
  updateSpeakerMutation,
} from './speakers.graphql';
import { Speaker } from './speaker.model';

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
      map((res: ApolloQueryResult<any>) => res.data.speakers)
    );
  }

  allSermonSpeakers(): Observable<Speaker[]> {
    return this.apollo.query({
      query: sermonSpeakersQuery,
      fetchPolicy: 'network-only'
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.sermon_speakers_view)
    );
  }

  allBySermonId(id: string): Observable<Speaker[]> {
    return this.apollo.query({
      query: speakerBySermonIdQuery,
      fetchPolicy: 'network-only',
      variables: {
        id
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.speakers)
    );
  }

  create(speaker: Partial<Speaker>) {
    delete speaker.created_at;
    delete speaker.updated_at;

    return this.apollo.mutate({
      mutation: createSpeakerMutation,
      variables: {
        objects: speaker
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.insert_speakers.returning[0])
    );
  }

  createSermonSpeaker(objects: {sermon_id: string, speaker_id: string}) {
    return this.apollo.mutate({
      mutation: createSermonSpeakerMutation,
      variables: {
        objects
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.insert_speaker_sermons.returning[0].speaker)
    );
  }

  update(speaker: Partial<Speaker>) {
    delete (speaker as any).__typename;

    return this.apollo.mutate({
      mutation: updateSpeakerMutation,
      variables: {
        id: speaker.id,
        speaker
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.update_speakers.returning[0])
    );
  }

  delete(speaker: Partial<Speaker>) {
    return this.apollo.mutate({
      mutation: deleteSpeakerMutation,
      variables: {
        id: speaker.id
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.delete_speakers.returning[0])
    );
  }

  deleteSermonSpeaker(sermonId: string) {
    return this.apollo.mutate({
      mutation: deleteSermonSpeakersMutation,
      variables: {
        sermonId
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.delete_speaker_sermons.returning.map((s: {speaker: Speaker}) => s.speaker))
    );
  }
}
