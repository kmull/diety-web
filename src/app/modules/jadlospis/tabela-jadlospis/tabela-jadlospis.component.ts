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
import { ELEMENT_DATA } from 'src/app/models/objects/element-data';

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
  ELEMENT_DATA = ELEMENT_DATA;
  dataSource = ELEMENT_DATA;

  dzien: string = DniTygodniaEnum.PONIEDZIALEK;
  selectedRowIndex: any;
  dania: DaniaAll[];
  selectedDania: DaniaAll;
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
            const index = this.ELEMENT_DATA.findIndex(i => i.dzien === this.dzien);
            this.dania[index][danie.rodzajDania] = danie.danie;
            this.ELEMENT_DATA[index][danie.rodzajDania] = this.mapDanie(danie.danie);
            this.dataSource = this.ELEMENT_DATA;
            this.ELEMENT_DATA.filter(osoba => osoba !== 'kasia');
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
    return wynik;
  }

  rowSelected(row): void {
    const index = this.dania.findIndex(i => i.dzien === row.dzien);
    this.selectedDania = this.dania[index];
    this.outDania.emit(this.selectedDania);

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
      data: ''
    });

    dialogRef.afterClosed().subscribe(dieta => {
      if (dieta) {
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
        if (!this.isAfternoonSnack) {
          this.dataSource.map(f => f.podwieczorek = null);
          this.dania.map(f => f.podwieczorek = null);
        }
        if (!this.isSecondBreakfast) {
          this.dataSource.map(f => f.drugieSniadanie = null);
          this.dania.map(f => f.drugieSniadanie = null);
        }
        this.dietaService.saveDiety(this.dieta).subscribe();
      }
    });
  }

  openDialogZapisaneDiety(): void {
    this.dietaService.loadAllDiety().subscribe(dietaList => {
      const dialogRef = this.dialog.open(ZapisaneDietyModalComponent, {
        width: '1200px',
        height: '600px',
        data: { dietaList }
      });
      dialogRef.afterClosed().subscribe((dieta: Dieta) => {
        if (dieta) {
          this.mapLoadedDiet(dieta.dane);
        }
      });
    });
  }

  mapLoadedDiet(dane: string[]) {
    const datasource: JadlospisModel[] = ELEMENT_DATA
    this.dania = [];

    dane.forEach(f => {
      f.substring(1, f.length - 1);
      this.dania.push(JSON.parse(f));
      const index = ELEMENT_DATA.findIndex(o => o.dzien === JSON.parse(f).dzien);
      datasource[index].sniadanie = this.dania[index].sniadanie
        ? this.mapDanie(this.dania[index].sniadanie) : null;
      datasource[index].drugieSniadanie = this.dania[index].drugieSniadanie
        ? this.mapDanie(this.dania[index].drugieSniadanie) : null;
      datasource[index].obiad = this.dania[index].obiad
        ? this.mapDanie(this.dania[index].obiad) : null;
      datasource[index].podwieczorek = this.dania[index].podwieczorek
        ? this.mapDanie(this.dania[index].podwieczorek) : null;
      datasource[index].kolacja = this.dania[index].kolacja
        ? this.mapDanie(this.dania[index].kolacja) : null;
    });
    this.dataSource = datasource;
  }

  resetRow() {
    const index = this.dataSource.findIndex(f => f.dzien === this.selectedDania.dzien);
    this.dataSource[index].sniadanie = null;
    this.dataSource[index].drugieSniadanie = null;
    this.dataSource[index].obiad = null;
    this.dataSource[index].podwieczorek = null;
    this.dataSource[index].kolacja = null;
  }

  resetDanie() {
    const index = this.dataSource.findIndex(f => f.dzien === this.selectedDania.dzien);
    this.dataSource[index][this.selectedResetDanieOption] = null;
  }

}
