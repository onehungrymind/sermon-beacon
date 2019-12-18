import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MAT_CHIPS_DEFAULT_OPTIONS,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsDefaultOptions,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

const MODULES = [
  BrowserAnimationsModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
];

const matChipsOptions: MatChipsDefaultOptions = {
  separatorKeyCodes: [ENTER, COMMA]
};

const matFormFieldOptions: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  imports: MODULES,
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: matChipsOptions
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: matFormFieldOptions
    }
  ],
  exports: MODULES
})
export class MaterialModule { }
