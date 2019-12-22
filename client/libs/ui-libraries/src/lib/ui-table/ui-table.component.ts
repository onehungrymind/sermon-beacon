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

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  editing: boolean;
  editingIndex: null;
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
    this.create.emit();
  }

  updateRow(row: { [key: string]: string }, i) {
    this.editing = true;
    this.editingIndex = i;
    this.form.patchValue(row);
  }

  saveRow() {
    this.editing = false;
    this.editingIndex = null;
    this.update = this.form.value.emit();
  }

  deleteRow(i = 0) {
    this.delete.emit(i);
  }

  private initForm(tableColumns: UiTableColumn[]) {
    const formGroup = tableColumns.reduce((acc, curr) => {
      return curr ? { ...acc, [curr.columnDef]: [null] } : { ...acc };
    }, {});
    this.form = this.fb.group(formGroup);
  }
}