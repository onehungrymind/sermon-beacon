import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

interface UiTableColumn {
  columnDef: string;
  title: string;
}

@Component({
  selector: 'sb-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss']
})

export class UiTableComponent implements OnInit, OnChanges {
  @Input() tableColumns: UiTableColumn[];
  @Input() data: { [key: string]: string }[];
  @Input() actionsEnabled: boolean;

  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  editing: boolean;
  editingIndex: number;
  form: FormGroup;
  spacerColumns = ['create-action', 'space1', 'space2', 'space3'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tableColumns && changes.tableColumns.currentValue) {
      this.initForm(this.tableColumns);
    }
  }

  mapTableColumnsToDisplyedColumns(tableColumns: UiTableColumn[], actionsEnabled: boolean): string[] {
    const actionColumn = actionsEnabled ? ['actions'] : [];

    return tableColumns && tableColumns.length ? [...tableColumns.map((column) => column.columnDef), ...actionColumn] : [];
  }

  createRow() {

  }

  updateRow(row: { [key: string]: string }, i: number) {
    this.editing = true;
    this.editingIndex = i;
    this.form.patchValue(row);
  }

  saveRow() {
    this.editing = false;
    this.editingIndex = null;
    if (!!this.form.get('id').value) {
      this.created.emit(this.form.value);

      return;
    }
    this.updated.emit(this.form.value);
  }

  deleteRow(feature: { [key: string]: string }) {
    this.deleted.emit(feature);
  }

  private initForm(tableColumns: UiTableColumn[]) {
    const formGroup = tableColumns.reduce((acc, curr) => {
      return curr ? { ...acc, [curr.columnDef]: [null], id: null } : { ...acc };
    }, {});
    this.form = this.fb.group(formGroup);
  }
}
