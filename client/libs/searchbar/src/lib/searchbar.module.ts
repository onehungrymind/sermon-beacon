import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { MaterialModule } from '@sb/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [SearchbarComponent],
  exports: [SearchbarComponent],
  providers: [  
    MatDatepickerModule,  
  ]
})
export class SearchbarModule { }
