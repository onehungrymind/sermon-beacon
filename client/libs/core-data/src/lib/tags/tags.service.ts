import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Tag } from './tag.model';
import {
  createTagsMutation,
  deleteTagsMutation,
  tagsQuery,
  updateTagsMutation
} from './tags.graphql';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private apollo: Apollo) {}

  all(): Observable<Tag[]> {
    return this.apollo
      .query({
        query: tagsQuery,
        fetchPolicy: 'network-only'
      })
      .pipe(map((res: ApolloQueryResult<any>) => res.data.sermon_tags_view));
  }

  create(tags: Partial<Tag>) {
    delete tags.id;
    delete tags.created_at;
    delete tags.updated_at;

    return this.apollo
      .mutate({
        mutation: createTagsMutation,
        variables: {
          objects: tags
        }
      })
      .pipe(
        map((res: ApolloQueryResult<any>) => res.data.insert_tags.returning[0])
      );
  }

  update(tags: Partial<Tag>) {
    delete (tags as any).__typename;

    return this.apollo
      .mutate({
        mutation: updateTagsMutation,
        variables: {
          id: tags.id,
          tags
        }
      })
      .pipe(
        map((res: ApolloQueryResult<any>) => res.data.update_tags.returning[0])
      );
  }

  delete(tags: Partial<Tag>) {
    return this.apollo
      .mutate({
        mutation: deleteTagsMutation,
        variables: {
          id: tags.id
        }
      })
      .pipe(
        map((res: ApolloQueryResult<any>) => res.data.delete_tags.returning[0])
      );
  }
}
