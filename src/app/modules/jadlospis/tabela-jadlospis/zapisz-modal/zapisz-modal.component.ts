import { DietaZapis } from './../../../../models/dieta-zapis';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-zapisz-modal',
  templateUrl: './zapisz-modal.component.html',
  styleUrls: ['./zapisz-modal.component.scss']
})
export class ZapiszModalComponent implements OnInit {

  dieta: DietaZapis;
  form: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ZapiszModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dieta = new DietaZapis();
    this.dieta.date = new Date();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dieta.name = this.form.get('name').value;
    this.dialogRef.close(this.dieta);
  }

}