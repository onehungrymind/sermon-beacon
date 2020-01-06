import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TableDataSource } from '@sb/material';

interface UiTableColumn {
  columnDef: string;
  title: string;
}

@Component({
  selector: 'sb-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UiTableComponent implements OnChanges {
  @Input() tableColumns: UiTableColumn[];
  @Input() data: { [key: string]: string }[];
  @Input() actionsEnabled: boolean;
  @Input() isLoading: boolean;

  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  creatingRow: boolean;
  editing: boolean;
  editingIndex: number;
  isDisabled: boolean;
  form: FormGroup;
  spacerColumns = ['createAction', 'space1', 'space2', 'space3'];
  dataSource: TableDataSource;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.dataSource = new TableDataSource(this.data, this.sort, this.paginator);
    });
    if (changes.tableColumns && changes.tableColumns.currentValue) {
      this.initForm(this.tableColumns);
    }
    this.form.reset();
  }

  mapTableColumnsToDisplyedColumns(tableColumns: UiTableColumn[], actionsEnabled: boolean): string[] {
    const actionColumn = actionsEnabled ? ['actions'] : [];

    return tableColumns && tableColumns.length ? [...tableColumns.map((column) => column.columnDef), ...actionColumn] : [];
  }

  createRow() {
    this.creatingRow = true;
    this.data = [...this.data, {}];
    this.dataSource.data = this.data;
    this.editing = true;
    this.editingIndex = 0;
    this.paginator._changePageSize(this.paginator.pageSize);
    this.isDisabled = true;
  }

  updateRow(row: { [key: string]: string }, i: number) {
    this.editing = true;
    this.editingIndex = i;
    this.form.patchValue(row);
  }

  saveRow() {
    this.editing = false;
    this.editingIndex = null;
    this.creatingRow = false;
    if (!!this.form.get('id').value) {
      this.updated.emit(this.form.value);
    } else {
      const { id, ...payload } = this.form.value;
      this.created.emit(payload);
    }
  }

  checkIfInputIsEmpty() {
    if (this.form.controls['name'].value === '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  deleteRow(feature: { [key: string]: string }) {
    if (this.editing && this.creatingRow) {
      this.data.pop();
      this.paginator._changePageSize(this.paginator.pageSize);
    }

    if (this.editing) {
      this.editing = false;
      this.editingIndex = null;
    } else if (feature.id) {
      this.deleted.emit(feature);
    }
    this.form.reset();
  }

  private initForm(tableColumns: UiTableColumn[]) {
    const formGroup = tableColumns.reduce((acc, curr) => {
      return curr ? { ...acc, [curr.columnDef]: [null] } : { ...acc };
    }, { id: null });
    this.form = this.formBuilder.group(formGroup);
  }
}
