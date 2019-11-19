import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ManageComponent } from './manage/manage.component';
import { RoutingModule } from './routing.module';
import { MaterialModule } from '@sb/material';
import { SermonsModule } from '@sb/sermons';
import { SearchbarModule } from '@sb/searchbar';


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    SermonsModule,
    SearchbarModule,
    RoutingModule,
  ],
  declarations: [
    AppComponent,
    ManageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
