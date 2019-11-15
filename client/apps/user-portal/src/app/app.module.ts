import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SermonsModule } from '@app/sermons';
import { AppRouterModule } from './router.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SermonsModule, AppRouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
