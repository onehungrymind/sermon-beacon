import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { environment } from '@env/environment';

const uri = environment.production ? 'https://server-beacon.herokuapp.com/v1/graphql' : 'http://127.0.0.1:8080/v1/graphql';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache()
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ],
  exports: [ApolloModule, HttpLinkModule]
})
export class CoreDataModule {}
