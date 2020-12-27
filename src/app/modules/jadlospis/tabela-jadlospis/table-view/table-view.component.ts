import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DaniaAll } from 'src/app/models/dania-all';
import { RodzajDaniaOpis } from 'src/app/models/enums/rodzaj-dania-enum';
import { TypyDietIndex } from 'src/app/models/enums/typy-diet-enum';
import { ELEMENT_DATA } from 'src/app/models/objects/element-data';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as cloneDeep from 'lodash/cloneDeep';
import { JadlospisModel } from 'src/app/models/jadlospis-model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {

  @ViewChild('exporter') exporter: any;
  @ViewChild('table') table: ElementRef;

  @Output() outtable = new EventEmitter<any>();
  @Output() outDania = new EventEmitter<DaniaAll>();
  @Output() outRecord = new EventEmitter<{ row: any, selectedDania: DaniaAll }>();
  @Output() outData = new EventEmitter<{ datasource: JadlospisModel[], dania: DaniaAll[], index: number }>()

  @Input() index = 0;
  @Input() dania: DaniaAll[] = [];
  @Input() dataSource = ELEMENT_DATA;
  @Input() displayedColumns: string[] = [];

  selectedRowIndex: any;
  selectedDania: DaniaAll;
  typyDietIndex = TypyDietIndex;
  rodzajDaniaOpis = RodzajDaniaOpis;

  rowSelected(row?): void {
    if (!!row && !!this.dania && !!this.dania.length) {
      const index = this.dania.findIndex(i => i.dzien === row.dzien);
      this.selectedDania = this.dania[index];
      this.selectedRowIndex = row.dzien;
      this.outRecord.emit({ row: row, selectedDania: this.selectedDania });
    }
  }

  onListDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource = cloneDeep(this.dataSource);
    this.madDania();
    this.outData.emit({ datasource: this.dataSource, dania: this.dania, index: this.index });
  }

  madDania(): void {
    const dania: DaniaAll[] = [];
    this.dataSource.forEach(f => {
      dania.push(this.dania[this.dania.findIndex(i => i.dzien === f.dzien)])
    })
    this.dania = cloneDeep(dania);
  }

}
