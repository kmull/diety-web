import { Dieta } from './../../../models/dieta-zapis';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
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
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-tabela-jadlospis',
  templateUrl: './tabela-jadlospis.component.html',
  styleUrls: ['./tabela-jadlospis.component.scss']
})
export class TabelaJadlospisComponent implements OnInit, OnDestroy {

  @Output() outRecord = new EventEmitter();
  @Output() outDania = new EventEmitter<DaniaAll>();
  @Output() outSecondBreakfast = new EventEmitter<boolean>();
  @Output() outAfternoonSnack = new EventEmitter<boolean>();

  displayedColumns: string[] = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
  dataSource = ELEMENT_DATA;

  dzien: string = DniTygodniaEnum.PONIEDZIALEK;
  selectedRowIndex: any;
  dania: DaniaAll[];
  selectedDzien: DaniaAll;
  dieta: Dieta;

  subskrypcja$: Subscription;

  isSecondBreakfast = false;
  isAfternoonSnack = false;

  selectedResetDanieOption: string;
  resetDanieOptions: any[] = [
    { value: 'sniadanie', viewValue: 'Śniadanie' },
    { value: 'drugieSniadanie', viewValue: 'Drugie śniadanie' },
    { value: 'obiad', viewValue: 'Obiad' },
    { value: 'podwieczorek', viewValue: 'Podwieczorek' },
    { value: 'kolacja', viewValue: 'Kolacja' }
  ];

  constructor(
    private posilekService: PosilekService,
    private dietaService: DietaService,
    public dialog: MatDialog
  ) {
    this.tableOptions();
  }

  ngOnDestroy(): void {
    this.posilekService.setDanie(null, null);
    this.subskrypcja$.unsubscribe();
  }

  ngOnInit(): void {
    this.dieta = new Dieta();
    this.dania = [
      new DaniaAll(DniTygodniaEnum.PONIEDZIALEK),
      new DaniaAll(DniTygodniaEnum.WTOREK),
      new DaniaAll(DniTygodniaEnum.SRODA),
      new DaniaAll(DniTygodniaEnum.CZWARTEK),
      new DaniaAll(DniTygodniaEnum.PIATEK),
      new DaniaAll(DniTygodniaEnum.SOBOTA),
      new DaniaAll(DniTygodniaEnum.NIEDZIELA)
    ];

    this.subskrypcja$ = this.posilekService.getDanie()
      .pipe(
        tap(danie => {
          if (!!danie && !!danie.rodzajDania && !!danie.danie) {
            const index = ELEMENT_DATA.findIndex(i => i.dzien === this.dzien);
            this.dania[index][danie.rodzajDania] = danie.danie;
            ELEMENT_DATA[index][danie.rodzajDania] = this.mapDanie(danie.danie);
            this.dataSource = ELEMENT_DATA;
            ELEMENT_DATA.filter(osoba => osoba !== 'kasia');
          }
        })
      )
      .subscribe();
  }

  mapDanie(danie): string {
    let wynik = '';
    for (const key of Object.keys(danie)) {
      if (key === 'dzien' || !danie[key]) {
        continue;
      }
      wynik += danie[key] + ', ';
    }
    console.log('wynik', wynik);
    return wynik;
  }

  rowSelected(row): void {
    const index = this.dania.findIndex(i => i.dzien === row.dzien);
    this.selectedDzien = this.dania[index];
    this.outDania.emit(this.selectedDzien);

    this.dzien = row.dzien;
    this.selectedRowIndex = row.dzien;
    this.outRecord.emit(row.dzien);
  }

  isSecondBreakfastChange(): void {
    this.isSecondBreakfast = !this.isSecondBreakfast;
    this.outSecondBreakfast.emit(this.isSecondBreakfast);
    this.tableOptions();
  }

  isAfternoonSnackChange(): void {
    this.isAfternoonSnack = !this.isAfternoonSnack;
    this.outAfternoonSnack.emit(this.isAfternoonSnack);
    this.tableOptions();
  }

  tableOptions(): void {
    if (this.isAfternoonSnack && this.isSecondBreakfast) {
      this.displayedColumns = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'podwieczorek', 'kolacja'];
    } else if (this.isAfternoonSnack) {
      this.displayedColumns = ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja'];
    } else if (this.isSecondBreakfast) {
      this.displayedColumns = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'kolacja'];
    } else {
      this.displayedColumns = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
    }
  }

  openDialogZapisz(): void {
    const dialogRef = this.dialog.open(ZapiszModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(dieta => {
      if (dieta) {
        console.log('result', dieta);
        this.dieta = dieta;
        this.dieta.dane = [
          JSON.stringify(this.dania[0]),
          JSON.stringify(this.dania[1]),
          JSON.stringify(this.dania[2]),
          JSON.stringify(this.dania[3]),
          JSON.stringify(this.dania[4]),
          JSON.stringify(this.dania[5]),
          JSON.stringify(this.dania[6]),
        ];
        // this.dieta.dane = this.dania;
        this.dietaService.saveDiety(this.dieta).subscribe();
      }
    });
  }

  resetRow() {
    const index = this.dataSource.findIndex(f => f.dzien === this.selectedDzien.dzien);
    this.dataSource[index].sniadanie = null;
    this.dataSource[index].drugieSniadanie = null;
    this.dataSource[index].obiad = null;
    this.dataSource[index].podwieczorek = null;
    this.dataSource[index].kolacja = null;
  }

  resetDanie() {
    const index = this.dataSource.findIndex(f => f.dzien === this.selectedDzien.dzien);
    this.dataSource[index][this.selectedResetDanieOption] = null;
  }

  downloadPdf(): void {
    // var prepare=[];
    // this.Listtrackigobjct.forEach(e=>{
    //   var tempObj =[];
    //   // tempObj.push(e.FullName);
    //   // tempObj.push(e.DepartmentName);
    //   // tempObj.push( e.CurrentCarType);
    //   // tempObj.push( e.CurrentCarModelString);
    //   // tempObj.push( e.CurrentModelYear);
    //   // tempObj.push(e.CurrentFuelTypeEnum);
    //   // tempObj.push(e.FuelContainerCapacity);
    //   // tempObj.push(e.MileageFloat);
    //   // prepare.push(tempObj);
    // });

    // const doc = new jsPDF();
    // autoTable({
    //     // head: [['dzien','','sniadanie','','obiad','','kolacja']],
    //     head: [this.displayedColumns],
    //     body: this.dieta.dane
    // });
    // doc.save('dieta' + '.pdf');

  }
  // }
  // print() { }

  //   print = () => {
  //   let doc = new jsPDF();
  //   doc.autoTable({
  //     head: [['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja']],
  //     // body: this.getLiveData() //returning [["log1", "$100"], ["log2", "$200"]]
  //     body: this.dataSource //returning [["log1", "$100"], ["log2", "$200"]]
  //   });
  //   doc.save('table.pdf')
  // }

  // print() {
  //   let doc = new jsPDF();

  //   let data = [];
  //   const displayedColumns = ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja']

  //   this.dataSource.forEach(obj => {
  //     let arr = [];
  //     this.displayedColumns.forEach(col => {
  //       arr.push(obj[col]);
  //     });
  //     data.push(arr);
  //   });
  //   doc.autoTable({
  //     head: [['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja']],
  //     body: data
  //   });
  //   doc.save('table.pdf');
  // }

  // openDialogZapisaneDiety(): void {
  //   this.dietaService.loadDiety(1).subscribe();
  // }

  openDialogZapisaneDiety(): void {
    this.dietaService.loadAllDiety().subscribe(dietaList => {
      const dialogRef = this.dialog.open(ZapisaneDietyModalComponent, {
        width: '1000px',
        height: '600px',
        data: { dietaList }
      });
    });
  }

}

export const ELEMENT_DATA: JadlospisModel[] = [
  { dzien: DniTygodniaEnum.PONIEDZIALEK },
  { dzien: DniTygodniaEnum.WTOREK },
  { dzien: DniTygodniaEnum.SRODA },
  { dzien: DniTygodniaEnum.CZWARTEK },
  { dzien: DniTygodniaEnum.PIATEK },
  { dzien: DniTygodniaEnum.SOBOTA },
  { dzien: DniTygodniaEnum.NIEDZIELA }
];


