import { DietaZapis } from './../../../models/dieta-zapis';
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
  selectedDanie: DaniaAll;
  dieta: DietaZapis;

  subskrypcja$: Subscription;

  isSecondBreakfast = false;
  isAfternoonSnack = false;

  constructor(
    private posilekService: PosilekService,
    // private mealDinnerService: MealDinnerService,
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
    console.log('dataSource', this.dataSource);
    this.dieta = new DietaZapis();
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
            console.log('this.dania', this.dania);

            ELEMENT_DATA[index][danie.rodzajDania] = this.mapDanie(danie.danie);
            this.dataSource = ELEMENT_DATA;
            ELEMENT_DATA.filter(osoba => osoba !== 'kasia');
          }
        })
      )
      .subscribe();
  }

  mapDanie(danie): string {
    console.log('danie', danie);
    let wynik = '';
    for (const key of Object.keys(danie)) {
      if (key === 'dzien' || !danie[key]) {
        continue;
      }
      wynik += danie[key] + ', ';
    }
    return wynik;
  }

  rowSelected(row): void {
    const index = this.dania.findIndex(i => i.dzien === row.dzien);
    this.selectedDanie = this.dania[index];
    this.outDania.emit(this.selectedDanie);

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

  tableOptions() {
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
    this.dietaService.loadAllDiety().subscribe();
  }


  // openDialogZapisaneDiety() {
  //   const dialogRef = this.dialog.open(ZapisaneDietyModalComponent, {
  //     width: '700px',
  //     height: '600px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed()
  //     .subscribe(dieta => {
  //       if (dieta) {
  //         console.log('result', dieta);
  //         this.dieta = dieta;
  //         this.dieta.dane = [
  //           JSON.stringify(this.dania[0]),
  //           JSON.stringify(this.dania[1]),
  //           JSON.stringify(this.dania[2]),
  //           JSON.stringify(this.dania[3]),
  //           JSON.stringify(this.dania[4]),
  //           JSON.stringify(this.dania[5]),
  //           JSON.stringify(this.dania[6]),
  //         ];
  //         // this.dieta.dane = this.dania;
  //         this.dietaService.saveDiety(this.dieta).subscribe();
  //       }
  //     });
  // }

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


