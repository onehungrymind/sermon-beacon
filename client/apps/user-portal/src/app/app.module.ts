import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/material';
import { UiModalModule } from '@app/ui-modal';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, UiModalModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
