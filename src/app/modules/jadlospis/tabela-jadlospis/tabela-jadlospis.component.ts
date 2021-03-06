import { Dieta } from './../../../models/dieta-zapis';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DniTygodniaEnum } from '../../../models/enums/dni-tygodnia-enum';
import { PosilekService } from '../../services/posiłek.service';
import { tap } from 'rxjs/operators';
import { DaniaAll } from './../../../models/dania-all';
import { DietaService } from '../../services/dieta.service';
import { Subscription } from 'rxjs';
import { JadlospisModel } from './../../../models/jadlospis-model';
import { MatDialog } from '@angular/material/dialog';
import { ZapiszModalComponent } from './zapisz-modal/zapisz-modal.component';
import { ZapisaneDietyModalComponent } from './zapisane-diety-modal/zapisane-diety-modal.component';
import { DANIA_ALL, ELEMENT_DATA } from 'src/app/models/objects/element-data';
import { TypyDietIndex, TypyDietNazwy } from 'src/app/models/enums/typy-diet-enum';
import { TypyDiet } from 'src/app/models/typy-diet';
import { TableViewComponent } from './table-view/table-view.component';
import * as XLSX from "xlsx";
import * as cloneDeep from 'lodash/cloneDeep';
import { DaniaList } from 'src/app/models/dania-list';

@Component({
  selector: 'app-tabela-jadlospis',
  templateUrl: './tabela-jadlospis.component.html',
  styleUrls: ['./tabela-jadlospis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabelaJadlospisComponent implements OnInit, OnDestroy {

  @ViewChild('podstawowatable') podstawowatable: TableViewComponent;
  @ViewChild('bezLaktozyTable') bezLaktozyTable: TableViewComponent;
  @ViewChild('lekkostrawnaTable') lekkostrawnaTable: TableViewComponent;
  @ViewChild('wegetarianskaTable') wegetarianskaTable: TableViewComponent;
  @ViewChild('stolowkaTable') stolowkaTable: TableViewComponent;

  @Output() outRecord = new EventEmitter();
  @Output() outDania = new EventEmitter<DaniaAll>();
  @Output() outIndex = new EventEmitter<number>();

  subskrypcja$: Subscription;
  ELEMENT_DATA = ELEMENT_DATA;

  dzien: string = DniTygodniaEnum.PONIEDZIALEK;
  selectedRowIndex: any;
  selectedDania: DaniaAll;
  dieta: Dieta;


  TYPY_DIET_NAZWY = TypyDietNazwy;
  typyDiet: TypyDiet[] = []

  index = 0;
  isPodstawowa = false;
  TYPY_DIET_INDEX = TypyDietIndex;

  DISPLAY_PODSTAWOWA = ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja'];
  DISPLAY_BEZ_LAKTOZY = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
  DISPLAY_LEKKOSTRAWNA = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'kolacja'];
  DISPLAY_WEGETARIANSKA = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
  DISPLAY_STOLOWKA = ['dzien', 'obiad'];

  dataSourceList = [
    cloneDeep(ELEMENT_DATA),
    cloneDeep(ELEMENT_DATA),
    cloneDeep(ELEMENT_DATA),
    cloneDeep(ELEMENT_DATA),
    cloneDeep(ELEMENT_DATA)
  ];

  // daniaList = new DaniaList();
  daniaList = [
    cloneDeep(DANIA_ALL),
    cloneDeep(DANIA_ALL),
    cloneDeep(DANIA_ALL),
    cloneDeep(DANIA_ALL),
    cloneDeep(DANIA_ALL)
  ];

  constructor(
    private posilekService: PosilekService,
    private dietaService: DietaService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    this.posilekService.setDanie(null, null);
    this.subskrypcja$.unsubscribe();
  }

  ngOnInit(): void {
    this.dieta = new Dieta();
    // this.daniaList.daniaList = [];
    // this.daniaList.daniaList.push(cloneDeep(DANIA_ALL));
    // this.daniaList.daniaList.push(cloneDeep(DANIA_ALL));
    // this.daniaList.daniaList.push(cloneDeep(DANIA_ALL));
    // this.daniaList.daniaList.push(cloneDeep(DANIA_ALL));
    // this.daniaList.daniaList.push(cloneDeep(DANIA_ALL));

    // daniaList: DaniaList[] = [
    //   cloneDeep(DANIA_ALL),
    //   cloneDeep(DANIA_ALL),
    //   cloneDeep(DANIA_ALL),
    //   cloneDeep(DANIA_ALL),
    //   cloneDeep(DANIA_ALL)
    // ];
    this.typyDiet.push(new TypyDiet(this.TYPY_DIET_NAZWY.PODSTAWOWA, DANIA_ALL))
    this.typyDiet.push(new TypyDiet(this.TYPY_DIET_NAZWY.BEZ_LAKTOZY, DANIA_ALL))
    this.typyDiet.push(new TypyDiet(this.TYPY_DIET_NAZWY.LEKKOSTRAWNA, DANIA_ALL))
    this.typyDiet.push(new TypyDiet(this.TYPY_DIET_NAZWY.WEGETARIANSKA, DANIA_ALL))
    this.typyDiet.push(new TypyDiet(this.TYPY_DIET_NAZWY.STOLOWKA, DANIA_ALL))

    this.subskrypcja$ = this.posilekService.getDanie()
      .pipe(
        tap(danie => {
          if (!!danie && !!danie.rodzajDania && !!danie.danie) {
            const index = this.dataSourceList[this.index].findIndex(i => i.dzien === this.dzien);
            this.daniaList[this.index][index][danie.rodzajDania] = danie.danie;
            this.dataSourceList[this.index][index][danie.rodzajDania] = this.mapDanieToString(danie.danie);
            this.dataSourceList = cloneDeep(this.dataSourceList);
            this.daniaList = cloneDeep(this.daniaList);
          }
        })
      )
      .subscribe(() => {
        this.cdr.markForCheck()
      });
  }

  private mapDanieToString(danie): string {
    let wynik = '';
    for (const key of Object.keys(danie)) {
      if (key === 'dzien' || !danie[key]) {
        continue;
      }
      wynik += danie[key] + ', ';
    }
    return wynik;
  }

  rowSelected(data: { row: any, selectedDania: DaniaAll }): void {
    const index = this.daniaList[this.index].findIndex(i => i.dzien === data.row.dzien);
    this.selectedDania = this.daniaList[this.index][index];
    this.selectedDania = data.selectedDania;
    this.outDania.emit(this.selectedDania);

    this.dzien = data.row.dzien;
    this.selectedRowIndex = data.row.dzien;
    this.outRecord.emit(data.row.dzien);
  }

  openDialogZapisz(): void {
    const dialogRef = this.dialog.open(ZapiszModalComponent, {
      width: '300px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(dieta => {
      if (dieta) {
        this.dieta = dieta;
        this.dieta.dane = [
          JSON.stringify(this.typyDiet[0]),
          JSON.stringify(this.typyDiet[1]),
          JSON.stringify(this.typyDiet[2]),
          JSON.stringify(this.typyDiet[3]),
          JSON.stringify(this.typyDiet[4])
        ];
        this.dietaService.saveDiety(this.dieta).subscribe();
      }
    });
  }

  openDialogZapisaneDiety(): void {
    this.dietaService.loadAllDiety().subscribe(dietaList => {
      const dialogRef = this.dialog.open(ZapisaneDietyModalComponent, {
        // width: '1300px',
        // height: '700px',
        maxWidth: '98vw',
        maxHeight: '95vh',
        height: '95%',
        width: '95%',
        data: { dietaList }
      });
      dialogRef.afterClosed().subscribe((dieta: Dieta) => {
        if (dieta) {
          this.mapLoadedDiet(dieta.dane);
        }
      });
    });
  }

  private mapLoadedDiet(dane: string[]): void {
    let index = 0;
    this.daniaList = [];
    const dataSourceList = [
      cloneDeep(ELEMENT_DATA),
      cloneDeep(ELEMENT_DATA),
      cloneDeep(ELEMENT_DATA),
      cloneDeep(ELEMENT_DATA),
      cloneDeep(ELEMENT_DATA)
    ];

    dane.forEach(k => {
      const daniaList: TypyDiet = JSON.parse(k);
      this.typyDiet[index].dieta = cloneDeep(daniaList.dieta);
      this.daniaList.push(cloneDeep(daniaList.dieta));

      let counter = 0;
      this.daniaList[index].forEach(element => {
        dataSourceList[index][counter].sniadanie = element.sniadanie
          ? this.mapDanieToString(element.sniadanie) : null;
        dataSourceList[index][counter].drugieSniadanie = element.drugieSniadanie
          ? this.mapDanieToString(element.drugieSniadanie) : null;
        dataSourceList[index][counter].obiad = element.obiad
          ? this.mapDanieToString(element.obiad) : null;
        dataSourceList[index][counter].podwieczorek = element.podwieczorek
          ? this.mapDanieToString(element.podwieczorek) : null;
        dataSourceList[index][counter].kolacja = element.kolacja
          ? this.mapDanieToString(element.kolacja) : null;
        counter++;
      });
      counter = 0;
      index++;
    });
    index = 0;
    this.dataSourceList = dataSourceList.slice();
    this.daniaList = this.daniaList.slice();
    this.cdr.markForCheck();
  }

  onResetTable(): void {
    this.daniaList[this.index].forEach(row => {
      row.sniadanie = null;
      row.drugieSniadanie = null;
      row.obiad = null;
      row.podwieczorek = null;
      row.kolacja = null;
    })
    this.dataSourceList[this.index].forEach(row => {
      row.sniadanie = null;
      row.drugieSniadanie = null;
      row.obiad = null;
      row.podwieczorek = null;
      row.kolacja = null;
    })

    this.dataSourceList = cloneDeep(this.dataSourceList);
    this.daniaList = cloneDeep(this.daniaList);
    this.cdr.markForCheck();
    this.cdr.markForCheck();
  }

  onResetRow(): void {
    const index = this.dataSourceList[this.index].findIndex(f => f.dzien === this.selectedDania.dzien);
    this.dataSourceList[this.index][index].sniadanie = null;
    this.dataSourceList[this.index][index].drugieSniadanie = null;
    this.dataSourceList[this.index][index].obiad = null;
    this.dataSourceList[this.index][index].podwieczorek = null;
    this.dataSourceList[this.index][index].kolacja = null;

    this.daniaList[this.index][index].sniadanie = null;
    this.daniaList[this.index][index].drugieSniadanie = null;
    this.daniaList[this.index][index].obiad = null;
    this.daniaList[this.index][index].podwieczorek = null;
    this.daniaList[this.index][index].kolacja = null;

    this.dataSourceList = cloneDeep(this.dataSourceList);
    this.daniaList = cloneDeep(this.daniaList);
    this.cdr.markForCheck();
  }

  onResetDanie(selectedResetDanieOption: string): void {
    const index = this.dataSourceList[this.index].findIndex(f => f.dzien === this.selectedDania.dzien);
    this.dataSourceList[this.index][index][selectedResetDanieOption] = null;
    this.daniaList[this.index][index][selectedResetDanieOption] = null;

    this.dataSourceList = cloneDeep(this.dataSourceList);
    this.daniaList = cloneDeep(this.daniaList);
    this.cdr.markForCheck();
  }

  onSelectedIndexChange(index: number): void {
    this.typyDiet[this.index].dieta = this.daniaList[this.index];
    this.dataSourceList[this.index] = this.mapDaniaToDatasource(this.daniaList[this.index]);

    this.selectedDania = null;
    this.outDania.emit(this.selectedDania);
    this.outRecord.emit(null);

    this.index = index;
    this.outIndex.emit(this.index);
    this.daniaList[this.index] = this.typyDiet[this.index].dieta;
    this.dataSourceList[this.index] = this.mapDaniaToDatasource(this.daniaList[this.index]);

    this.dataSourceList = cloneDeep(this.dataSourceList);
    this.daniaList = cloneDeep(this.daniaList);
    this.cdr.markForCheck();
  }

  onDrukuj(): void {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.podstawowatable.table.nativeElement
    );
    let wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, TypyDietNazwy.PODSTAWOWA);
    // -----------------------------------------------------
    ws = XLSX.utils.table_to_sheet(
      this.bezLaktozyTable.table.nativeElement
    );
    XLSX.utils.book_append_sheet(wb, ws, TypyDietNazwy.BEZ_LAKTOZY);
    // // -----------------------------------------------------
    ws = XLSX.utils.table_to_sheet(
      this.lekkostrawnaTable.table.nativeElement
    );
    XLSX.utils.book_append_sheet(wb, ws, TypyDietNazwy.LEKKOSTRAWNA);
    // // -----------------------------------------------------
    ws = XLSX.utils.table_to_sheet(
      this.wegetarianskaTable.table.nativeElement
    );
    XLSX.utils.book_append_sheet(wb, ws, TypyDietNazwy.WEGETARIANSKA);
    // // -----------------------------------------------------
    ws = XLSX.utils.table_to_sheet(
      this.stolowkaTable.table.nativeElement
    );
    XLSX.utils.book_append_sheet(wb, ws, TypyDietNazwy.STOLOWKA);
    // -----------------------------------------------------

    /* save to file */
    XLSX.writeFile(wb, 'Diety.xlsx');
  }

  private mapDaniaToDatasource(dania: DaniaAll[]): JadlospisModel[] {
    const jadlospisAll: JadlospisModel[] = [];
    dania.forEach(f => {
      jadlospisAll.push(this.formatDania(f));
    })
    // }
    return jadlospisAll;
  }

  formatDania(daniaAll: DaniaAll): JadlospisModel {
    const jadlospis = new JadlospisModel();
    jadlospis.dzien = daniaAll.dzien;
    jadlospis.sniadanie = !!daniaAll.sniadanie ? this.mapDanieToString(daniaAll.sniadanie) : null;
    jadlospis.drugieSniadanie = !!daniaAll.drugieSniadanie ? this.mapDanieToString(daniaAll.drugieSniadanie) : null;
    jadlospis.obiad = !!daniaAll.obiad ? this.mapDanieToString(daniaAll.obiad) : null;
    jadlospis.podwieczorek = !!daniaAll.podwieczorek ? this.mapDanieToString(daniaAll.podwieczorek) : null;
    jadlospis.kolacja = !!daniaAll.kolacja ? this.mapDanieToString(daniaAll.kolacja) : null;
    return jadlospis;
  }

}
