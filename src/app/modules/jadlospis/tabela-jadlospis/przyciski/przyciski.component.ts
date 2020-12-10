import { Component, Input, OnInit } from '@angular/core';
import { DaniaAll } from 'src/app/models/dania-all';
import { JadlospisModel } from 'src/app/models/jadlospis-model';

@Component({
  selector: 'app-przyciski',
  templateUrl: './przyciski.component.html',
  styleUrls: ['./przyciski.component.scss']
})
export class PrzyciskiComponent implements OnInit {

  @Input() dataSource: JadlospisModel[];
  @Input() selectedDzien: DaniaAll;
  @Input() isSecondBreakfast: boolean;
  @Input() isAfternoonSnack: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // isSecondBreakfastChange(): void {
  //   this.isSecondBreakfast = !this.isSecondBreakfast;
  //   this.outSecondBreakfast.emit(this.isSecondBreakfast);
  //   // this.tableOptions();
  // }

  // isAfternoonSnackChange(): void {
  //   this.isAfternoonSnack = !this.isAfternoonSnack;
  //   this.outAfternoonSnack.emit(this.isAfternoonSnack);
  //   // this.tableOptions();
  // }

  resetRow() {
    const index = this.dataSource.findIndex(f => f.dzien === this.selectedDzien.dzien);
    this.dataSource[index].sniadanie = null;
    this.dataSource[index].drugieSniadanie = null;
    this.dataSource[index].obiad = null;
    this.dataSource[index].podwieczorek = null;
    this.dataSource[index].kolacja = null;
  }

}
