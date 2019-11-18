import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/material';
import { UiModalModule } from '@app/ui-modal';
import { SermonsModule } from '@app/sermons';

import { AppComponent } from './app.component';
import { AppRouterModule } from './router.module';
import { SermonsComponent } from './sermons/sermons.component';
import { SermonViewComponent } from './sermons/sermon-view/sermon-view.component';

@NgModule({
  declarations: [AppComponent, SermonsComponent, SermonViewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SermonsModule,
    MaterialModule,
    UiModalModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
