import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@sb/material';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { UiTableComponent } from './ui-table/ui-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [UiModalComponent],
  declarations: [UiModalComponent, ToolbarComponent, SearchbarComponent, UiTableComponent],
  exports: [UiModalComponent, ToolbarComponent, SearchbarComponent, UiTableComponent]
})
export class UiLibrariesModule {}
