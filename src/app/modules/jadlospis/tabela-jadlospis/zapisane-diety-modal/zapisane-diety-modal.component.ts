import { Dieta } from './../../../../models/dieta-zapis';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZapiszModalComponent } from '../zapisz-modal/zapisz-modal.component';

@Component({
  selector: 'app-zapisane-diety-modal',
  templateUrl: './zapisane-diety-modal.component.html',
  styleUrls: ['./zapisane-diety-modal.component.scss']
})
export class ZapisaneDietyModalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource = [];

  selectedRowIndex: any;
  selectedDieta: string[];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ZapiszModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dieta[]
  ) { }

  ngOnInit(): void {
    this.dataSource = this.data['dietaList'];
  }

  rowSelected(row: Dieta) {
    console.log(row);
    this.selectedRowIndex = row.id;
    this.selectedDieta = row.dane;
  }

}
