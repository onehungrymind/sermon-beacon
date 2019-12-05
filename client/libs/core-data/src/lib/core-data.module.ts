import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

// GraphQL
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { SermonsService } from './sermons/sermons.service';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// import { createApollo } from './core-data.module';



const uri = 'http://0.0.0.0:8080/v1/graphql';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache()
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
  SermonsService,
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink]
  }
  ],
  exports: [ApolloModule, HttpLinkModule]
})
export class CoreDataModule {}
