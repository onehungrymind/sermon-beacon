import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule
} from '@angular/material';
import { SermonTableComponent } from './sermon-table/sermon-table.component';

const MODULES = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule
];

@NgModule({
  imports: [
    MODULES,
    MatSortModule,
    MatTableModule,
  ],
  exports: [
    MODULES,
    SermonTableComponent
  ],
  declarations: [SermonTableComponent]
})
export class MaterialModule {}
