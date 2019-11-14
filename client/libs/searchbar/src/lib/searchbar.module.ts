import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { MaterialModule } from '@app/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [SearchbarComponent],
  exports: [SearchbarComponent]
})
export class SearchbarModule { }
