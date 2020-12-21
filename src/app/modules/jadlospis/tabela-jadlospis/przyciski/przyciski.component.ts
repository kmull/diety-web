import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DaniaAll } from 'src/app/models/dania-all';

@Component({
  selector: 'app-przyciski',
  templateUrl: './przyciski.component.html',
  styleUrls: ['./przyciski.component.scss']
})
export class PrzyciskiComponent implements OnInit {

  // @Output() outSecondBreakfast = new EventEmitter<boolean>();
  // @Output() outAfternoonSnack = new EventEmitter<boolean>();

  @Output() outOpenDialogZapisz = new EventEmitter<void>();
  @Output() outOpenDialogZapisaneDiety = new EventEmitter<void>();
  @Output() outDrukuj = new EventEmitter<void>();

  @Output() outResetDanie = new EventEmitter<string>();
  @Output() outResetRow = new EventEmitter<void>();
  @Output() outResetTable = new EventEmitter<void>();

  @Input() tableView: any;
  @Input() selectedDzien: DaniaAll;
  @Input() isSecondBreakfast: boolean;
  @Input() isAfternoonSnack: boolean;

  @Input() selectedDania;
  selectedResetDanieOption: string;

  resetDanieOptions: any[] = [
    { value: 'sniadanie', viewValue: 'Śniadanie' },
    { value: 'drugieSniadanie', viewValue: 'Drugie śniadanie' },
    { value: 'obiad', viewValue: 'Obiad' },
    { value: 'podwieczorek', viewValue: 'Podwieczorek' },
    { value: 'kolacja', viewValue: 'Kolacja' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  resetDanie() {
    this.outResetDanie.emit(this.selectedResetDanieOption);
    this.selectedResetDanieOption = null;
  }

}
