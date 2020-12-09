import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZapiszModalComponent } from '../zapisz-modal/zapisz-modal.component';

@Component({
  selector: 'app-zapisane-diety-modal',
  templateUrl: './zapisane-diety-modal.component.html',
  styleUrls: ['./zapisane-diety-modal.component.scss']
})
export class ZapisaneDietyModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ZapiszModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
