import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  createMediaTypesMutation,
  deleteMediaTypesMutation,
  mediaTypeQuery,
  updateMediaTypesMutation
} from './media-types.graphql';
import { MediaType } from './media-type.model';

@Injectable({
  providedIn: 'root'
})
export class MediaTypesService {
  constructor(private apollo: Apollo) {}

  all(): Observable<MediaType[]> {
    return this.apollo.query({
      query: mediaTypeQuery,
      fetchPolicy: 'network-only'
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.media_types)
    );
  }

  create(mediaType: Partial<MediaType>) {
    delete (mediaType as any).__typename;

    return this.apollo.mutate({
      mutation: createMediaTypesMutation,
      variables: {
        objects: mediaType
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.insert_media_types.returning[0])
    );
  }

  update(oldMediaTypeName: string, mediaType: Partial<MediaType>) {
    delete (mediaType as any).__typename;

    return this.apollo.mutate({
      mutation: updateMediaTypesMutation,
      variables: {
        name: oldMediaTypeName,
        mediaType
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.update_media_types.returning[0])
    );
  }

  delete(mediaType: Partial<MediaType>) {
    return this.apollo.mutate({
      mutation: deleteMediaTypesMutation,
      variables: {
        name: mediaType.name
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.delete_media_types.returning[0])
    );
  }
}
