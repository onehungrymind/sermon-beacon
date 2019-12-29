import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  createSermonTagsMutation,
  createTagsMutation,
  deleteSermonTagsMutation,
  deleteTagsMutation,
  tagsBySermonIdQuery,
  tagsQuery,
  updateTagsBySermonIdMutation,
  updateTagsMutation,
} from './tags.graphql';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private apollo: Apollo) {}

  all(): Observable<Tag[]> {
    return this.apollo.query({
      query: tagsQuery,
      fetchPolicy: 'network-only'
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.tags)
    );
  }

  allBySermonId(id: string) {
    return this.apollo.query({
      query: tagsBySermonIdQuery,
      fetchPolicy: 'network-only',
      variables: {
        id
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.tags)
    );
  }

  create(tags: Partial<Tag>) {
    delete tags.id;
    delete tags.created_at;
    delete tags.updated_at;

    return this.apollo.mutate({
      mutation: createTagsMutation,
      variables: {
        objects: tags
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.insert_tags.returning[0])
    );
  }

  createSermonTags(objects: {sermon_id: string, tag: {data: Partial<Tag>}}) {
    return this.apollo.mutate({
      mutation: createSermonTagsMutation,
      variables: {
        objects
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.insert_sermon_tags.returning[0].tag)
    );
  }

  update(tags: Partial<Tag>) {
    return this.apollo.mutate({
      mutation: updateTagsMutation,
      variables: {
        id: tags.id,
        tags
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.update_tags.returning[0])
    );
  }

  updateBySermonId(sermonId: string, tags: Partial<Tag>) {
    return this.apollo.mutate({
      mutation: updateTagsBySermonIdMutation,
      variables: {
        id: sermonId,
        tags
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.update_tags.returning[0])
    );
  }

  delete(tags: Partial<Tag>) {
    return this.apollo.mutate({
      mutation: deleteTagsMutation,
      variables: {
        id: tags.id
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.delete_tags.returning[0])
    );
  }

  deleteSermonTag(sermonId: string) {
    return this.apollo.mutate({
      mutation: deleteSermonTagsMutation,
      variables: {
        sermonId
      }
    }).pipe(
      map((res: ApolloQueryResult<any>) => res.data.delete_sermon_tags.returning.map((t: {tag: Tag}) => t.tag))
    );
  }
}
