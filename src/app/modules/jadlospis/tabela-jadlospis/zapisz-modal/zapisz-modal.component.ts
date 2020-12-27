import { Dieta } from './../../../../models/dieta-zapis';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-zapisz-modal',
  templateUrl: './zapisz-modal.component.html',
  styleUrls: ['./zapisz-modal.component.scss']
})
export class ZapiszModalComponent implements OnInit {

  dieta: Dieta;
  form: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ZapiszModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dietaLoaded: Dieta
  ) { }

  ngOnInit(): void {
    this.dieta = new Dieta();
    this.dieta.date = new Date();
    if (this.dietaLoaded && !!this.dietaLoaded.name) {
      this.dieta.name = this.dietaLoaded.name;
      this.form.get('name').setValue(this.dietaLoaded.name);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dieta.name = this.form.get('name').value;
    if (!!this.dietaLoaded && !!this.dietaLoaded.name && this.dieta.name === this.dietaLoaded.name) {
      this.dieta.id = this.dietaLoaded.id;
    } else {
      this.dieta = new Dieta();
      this.dieta.name = this.form.get('name').value;
    }
    this.dieta.date = new Date();
    this.dialogRef.close(this.dieta);
  }

}
