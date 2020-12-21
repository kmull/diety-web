import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DaniaAll } from 'src/app/models/dania-all';
import { TypyDietIndex } from 'src/app/models/enums/typy-diet-enum';
import { ELEMENT_DATA } from 'src/app/models/objects/element-data';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @ViewChild('exporter') exporter: any;
  @ViewChild('table') table: ElementRef;

  @Output() outRecord = new EventEmitter<{ row: any, selectedDania: DaniaAll }>();
  @Output() outDania = new EventEmitter<DaniaAll>();
  @Output() outtable = new EventEmitter<any>();

  private _index = 0;
  @Input() public get index(): number {
    return this._index;
  };
  public set index(value: number) {
    this._index = value;
    if (value || value > -1) {
      // this.displayedColumns = this.tableOptions(value);
    }
  }

  @Input() dania: DaniaAll[] = [];
  @Input() dataSource = ELEMENT_DATA;

  @Input() displayedColumns: string[] = [];
  selectedRowIndex: any;
  selectedDania: DaniaAll;
  typyDietIndex = TypyDietIndex;

  constructor() { }

  ngOnInit(): void {
  }

  rowSelected(row?): void {
    if (!!row && !!this.dania && !!this.dania.length) {
      const index = this.dania.findIndex(i => i.dzien === row.dzien);
      this.selectedDania = this.dania[index];
      this.selectedRowIndex = row.dzien;
      this.outRecord.emit({ row: row, selectedDania: this.selectedDania });
    }
  }

  tableOptions(index: number) {
    switch (index) {
      case TypyDietIndex.PODSTAWOWA:
        return ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja'];
      case TypyDietIndex.BEZ_LAKTOZY:
        return ['dzien', 'sniadanie', 'obiad', 'kolacja'];
      case TypyDietIndex.LEKKOSTRAWNA:
        return ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'kolacja'];
      case TypyDietIndex.WEGETARIANSKA:
        return ['dzien', 'sniadanie', 'obiad', 'kolacja'];
      case TypyDietIndex.STOLOWKA:
        return ['dzien', 'obiad'];
    }
  }

}
