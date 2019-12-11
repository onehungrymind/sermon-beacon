import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Media } from './media.model';
import {
  mediaQuery,
  createMediaMutation,
  updateMediaMutation,
  deleteMediaMutation
} from './media.graphql';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private apollo: Apollo) {}

  all(): Observable<Media[]> {
    return this.apollo
      .query({
        query: mediaQuery,
        fetchPolicy: 'network-only'
      })
      .pipe(map((res: ApolloQueryResult<any>) => res.data.media));
  }

  create(media: Partial<Media>) {
    delete (media as any).__typename;
    delete media.id;
    delete media.created_at;
    delete media.updated_at;

    return this.apollo
      .mutate({
        mutation: createMediaMutation,
        variables: {
          objects: media
        }
      })
      .pipe(
        map((res: ApolloQueryResult<any>) => res.data.insert_media.returning[0])
      );
  }

  update(media: Partial<Media>) {
    delete (media as any).__typename;

    return this.apollo
      .mutate({
        mutation: updateMediaMutation,
        variables: {
          id: media.id,
          media
        }
      })
      .pipe(
        map((res: ApolloQueryResult<any>) => res.data.update_media.returning[0])
      );
  }

  delete(media: Partial<Media>) {
    return this.apollo
      .mutate({
        mutation: deleteMediaMutation,
        variables: {
          id: media.id
        }
      })
      .pipe(
        map((res: ApolloQueryResult<any>) => res.data.delete_media.returning[0])
      );
  }
}
