import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreDataModule } from '@sb/core-data';
import { CoreStateModule } from '@sb/core-state';
import { MaterialModule } from '@sb/material';
import { SearchbarModule } from '@sb/searchbar';
import { SermonsModule } from '@sb/sermons';
import { UiLibrariesModule } from '@sb/ui-libraries';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { SermonViewComponent } from './sermon-view/sermon-view.component';

@NgModule({
  declarations: [AppComponent, SermonViewComponent],
  imports: [
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    SearchbarModule,
    SermonsModule,
    UiLibrariesModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
