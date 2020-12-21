import { Dieta } from './../../../../models/dieta-zapis';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZapiszModalComponent } from '../zapisz-modal/zapisz-modal.component';
import { DietaService } from 'src/app/modules/services/dieta.service';
import { switchMap, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-zapisane-diety-modal',
  templateUrl: './zapisane-diety-modal.component.html',
  styleUrls: ['./zapisane-diety-modal.component.scss']
})
export class ZapisaneDietyModalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: MatTableDataSource<Dieta> = new MatTableDataSource();

  selectedRowIndex: any;
  selectedDieta: Dieta;
  selectedDaneList;
  selectedDaneNames: KeyValue<string, string[]>[] = [
    { key: 'Podstawowa', value: ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja'] },
    { key: 'Bez laktozy', value: ['dzien', 'sniadanie', 'obiad', 'kolacja'] },
    { key: 'Lekkostrawna', value: ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'kolacja'] },
    { key: 'Wegetariańska', value: ['dzien', 'sniadanie', 'obiad', 'kolacja'] },
    { key: 'Stołówka', value: ['dzien', 'obiad'] }
  ];

  DISPLAY_PODSTAWOWA = ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja'];
  DISPLAY_BEZ_LAKTOZY = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
  DISPLAY_LEKKOSTRAWNA = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'kolacja'];
  DISPLAY_WEGETARIANSKA = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
  DISPLAY_STOLOWKA = ['dzien', 'obiad'];

  constructor(
    private dietaService: DietaService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ZapiszModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dieta[]
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data['dietaList']);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rowSelected(row: Dieta): void {
    this.selectedRowIndex = row.id;
    this.selectedDieta = row;

    this.selectedDaneList = [];
    row.dane.forEach(f => {
      this.selectedDaneList.push(f);
    });
    console.log('selectedDieta', this.selectedDieta);
  }

  onSave(): void {
    this.onCancel();
  }

  onCancel(): void {
    this.dialogRef.close(this.selectedDieta);
  }

  onDelete(): void {
    this.dietaService.deleteDiet(this.selectedDieta.id)
      .pipe(
        switchMap(() => this.dietaService.loadAllDiety()
          .pipe(
            tap(dietaList => this.dataSource.data = dietaList)
          )
        )).subscribe(() => this.selectedDieta = null);
  }

}
