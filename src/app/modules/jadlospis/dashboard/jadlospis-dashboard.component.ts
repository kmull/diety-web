import { DaniaAll } from '../../../models/dania-all';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jadlospis-dashboard',
  templateUrl: './jadlospis-dashboard.component.html',
  styleUrls: ['./jadlospis-dashboard.component.scss']
})
export class JadlospisDashboardComponent implements OnInit {

  dzien: string;
  dania: DaniaAll;
  isSecondBreakfast = false;
  isAfternoonSnack = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(value: string) {
    this.dzien = value;
  }

  onSelectedDania(dania: DaniaAll) {
    this.dania = dania;
  }

}
