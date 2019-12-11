import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { MediaTypes } from './media-types';
import {
  mediaTypeQuery,
  createMediaTypesMutation,
  updateMediaTypesMutation,
  deleteMediaTypesMutation
} from './media-types.graphql';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class MediaTypesService {
  constructor(private apollo: Apollo) {}

  all(): Observable<MediaTypes[]> {
    return this.apollo
      .query({
        query: mediaTypeQuery,
        fetchPolicy: 'network-only'
      })
      .pipe(map((res: ApolloQueryResult<any>) => res.data.media_types));
  }

  create(mediaTypes: Partial<MediaTypes>) {
    delete (mediaTypes as any).__typename;

    return this.apollo
      .mutate({
        mutation: createMediaTypesMutation,
        variables: {
          objects: mediaTypes
        }
      })
      .pipe(
        map(
          (res: ApolloQueryResult<any>) =>
            res.data.insert_media_type.returning[0]
        )
      );
  }

  update(mediaTypes: Partial<MediaTypes>) {
    delete (mediaTypes as any).__typename;

    return this.apollo
      .mutate({
        mutation: updateMediaTypesMutation,
        variables: {
          type: mediaTypes
        }
      })
      .pipe(
        map(
          (res: ApolloQueryResult<any>) =>
            res.data.update_media_type.returning[0]
        )
      );
  }

  delete(mediaType: Partial<MediaTypes>) {
    return this.apollo
      .mutate({
        mutation: deleteMediaTypesMutation,
        variables: {
          id: mediaType
        }
      })
      .pipe(
        map(
          (res: ApolloQueryResult<any>) =>
            res.data.delete_media_type.returning[0]
        )
      );
  }
}
