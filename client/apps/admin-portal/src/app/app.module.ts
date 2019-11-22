import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreDataModule } from '@sb/core-data';
import { CoreStateModule } from '@sb/core-state';
import { MaterialModule } from '@sb/material';
import { SearchbarModule } from '@sb/searchbar';
import { SermonsModule } from '@sb/sermons';
import { UiModalModule } from '@sb/ui-modal';
import { UiToolbarModule } from '@sb/ui-toolbar';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    SearchbarModule,
    SermonsModule,
    UiModalModule,
    UiToolbarModule,
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
