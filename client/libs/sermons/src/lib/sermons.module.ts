import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchbarModule } from '@sb/searchbar';
import { SermonsComponent } from './sermons/sermons.component';
import { SermonListComponent } from './sermons/sermon-list/sermon-list.component';
import { SermonDetailsComponent } from './sermons/sermon-details/sermon-details.component';

@NgModule({
  imports: [
    CommonModule,
    SearchbarModule
  ],
  declarations: [
    SermonsComponent,
    SermonListComponent,
    SermonDetailsComponent
  ],
  exports: [
    SermonsComponent,
    SermonListComponent,
    SermonDetailsComponent
  ],
})
export class SermonsModule { }
