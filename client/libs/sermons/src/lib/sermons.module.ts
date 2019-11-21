import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SermonsComponent } from './sermons/sermons.component';
import { SermonListComponent } from './sermons/sermon-list/sermon-list.component';
import { SermonDetailsComponent } from './sermons/sermon-details/sermon-details.component';
import { SearchbarModule } from '@sb/searchbar';


@NgModule({
  imports: [
    CommonModule,
    SearchbarModule
  ],
  exports: [SermonListComponent],
  declarations: [
    SermonsComponent,
    SermonListComponent,
    SermonDetailsComponent
  ]
})
export class SermonsModule { }
