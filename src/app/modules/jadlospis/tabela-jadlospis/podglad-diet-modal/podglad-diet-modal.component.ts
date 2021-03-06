import { DaniaAll } from './../../../../models/dania-all';
import { Component, Input } from '@angular/core';
import { JadlospisModel } from 'src/app/models/jadlospis-model';
import { MapDietyUtil } from 'src/app/shared/utils/map-diet-util';

@Component({
  selector: 'app-podglad-diet-modal',
  templateUrl: './podglad-diet-modal.component.html',
  styleUrls: ['./podglad-diet-modal.component.scss']
})
export class PodgladDietModalComponent {

  private _dieta: any;
  @Input() public get dieta(): any {
    return this._dieta;
  }
  public set dieta(value: any) {
    this._dieta = value;

    this.dataSource = !!this.dieta ? MapDietyUtil.mapDiety(JSON.parse(this.dieta).dieta) : [];
    // this.dataSource = !!this.dieta ? MapDietyUtil.mapDiety(this.dieta) : [];
  }

  @Input() displayedColumns = [];
  // @Input() displayedColumns = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'podwieczorek', 'kolacja'];
  dataSource: JadlospisModel[];

  // private _dieta: JadlospisModel[];
  // @Input() public get dieta(): JadlospisModel[] {
  //   return this._dieta;
  // }
  // public set dieta(value: JadlospisModel[]) {
  //   this._dieta = value;
  //   this.dataSource = !!this.dieta ? MapDietyUtil.mapDiety(this.dieta) : [];
  // }

  // displayedColumns = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'podwieczorek', 'kolacja'];
  // dataSource: JadlospisModel[];

}
