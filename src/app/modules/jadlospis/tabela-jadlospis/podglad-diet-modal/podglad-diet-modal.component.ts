import { Component, Input, OnInit } from '@angular/core';
import { JadlospisModel } from 'src/app/models/jadlospis-model';

@Component({
  selector: 'app-podglad-diet-modal',
  templateUrl: './podglad-diet-modal.component.html',
  styleUrls: ['./podglad-diet-modal.component.scss']
})
export class PodgladDietModalComponent implements OnInit {

  private _dieta: JadlospisModel[];
  @Input() public get dieta(): JadlospisModel[] {
    return this._dieta;
  }
  public set dieta(value: JadlospisModel[]) {
    this._dieta = value;
    if (!!value) {
      this.mapDiety(this.dieta);
    }
  }

  displayedColumns = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'podwieczorek', 'kolacja'];
  dataSource: JadlospisModel[];

  constructor() { }

  ngOnInit(): void {
  }

  private mapDiety(diety: JadlospisModel[]): void {
    const jadlospis: JadlospisModel[] = [];
    diety.forEach(f => {
      const dietaFromJson = JSON.parse(f.toString());
      console.log('dietaFromJson', dietaFromJson);
      if (!!dietaFromJson) {
        if (!!dietaFromJson.sniadanie) {
          dietaFromJson.sniadanie = this.mapData(dietaFromJson.sniadanie).trim();
        }
        if (!!dietaFromJson.drugieSniadanie) {
          dietaFromJson.drugieSniadanie = this.mapData(dietaFromJson.drugieSniadanie).trim();
        }
        if (!!dietaFromJson.obiad) {
          dietaFromJson.obiad = this.mapData(dietaFromJson.obiad).trim();
        }
        if (!!dietaFromJson.podwieczorek) {
          dietaFromJson.podwieczorek = this.mapData(dietaFromJson.podwieczorek).trim();
        }
        if (!!dietaFromJson.kolacja) {
          dietaFromJson.kolacja = this.mapData(dietaFromJson.kolacja).trim();
        }
      }

      jadlospis.push(dietaFromJson);
    });
    this.dataSource = jadlospis;
    console.log('this.dataSource', this.dataSource);
  }

  private mapData(danie): string {
    let potrawa = '';
    for (let mealName of Object.keys(danie)) {
      if (!!danie[mealName] && mealName !== 'dzien')
        potrawa += `${danie[mealName]}, `;
    }
    return potrawa.trim().slice(0, potrawa.length - 1);
  }


}
