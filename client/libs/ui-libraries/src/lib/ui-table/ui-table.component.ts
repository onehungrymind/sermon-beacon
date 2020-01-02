import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  styleUrls: ['./ui-table.component.scss']
})

export class UiTableComponent implements AfterViewInit, OnChanges {
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

  ngAfterViewInit() {
  }

  mapTableColumnsToDisplyedColumns(tableColumns: UiTableColumn[], actionsEnabled: boolean): string[] {
    const actionColumn = actionsEnabled ? ['actions'] : [];

    return tableColumns && tableColumns.length ? [...tableColumns.map((column) => column.columnDef), ...actionColumn] : [];
  }

  createRow() {
    this.creatingRow = true;
    this.data = [{}, ...this.data];
    if (this.creatingRow) {
      this.editing = true;
      this.editingIndex = 0;
    }
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

  deleteRow(feature: { [key: string]: string }) {
    if (this.editing && this.creatingRow) {
      this.data = this.data.slice(1);
    }

    if (this.editing) {
      this.editing = false;
      this.editingIndex = null;
    } else if (feature.id) {
      this.deleted.emit(feature);
    }
  }

  private initForm(tableColumns: UiTableColumn[]) {
    const formGroup = tableColumns.reduce((acc, curr) => {
      return curr ? { ...acc, [curr.columnDef]: [null] } : { ...acc };
    }, { id: null });
    this.form = this.formBuilder.group(formGroup);
  }
}
