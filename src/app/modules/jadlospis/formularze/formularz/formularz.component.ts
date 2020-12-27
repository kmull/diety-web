import { DaniaAll } from './../../../../models/dania-all';
import { TypyDietIndex } from './../../../../models/enums/typy-diet-enum';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-formularz',
  templateUrl: './formularz.component.html',
  styleUrls: ['./formularz.component.scss']
})
export class FormularzComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  @Input() dzien: string;

  private _index = 0;
  @Input() public get index(): number {
    return this._index;
  }

  public set index(value: number) {
    this.panelStateSniadanie = false
    this.panelStateDrugieSniadanie = false;
    this.panelStateObiad = false;
    this.panelStatePodwieczorek = false;
    this.panelStateKolacja = false;
    this._index = value;
  }

  private _selectedDanie: DaniaAll;
  @Input() public get selectedDanie(): DaniaAll {
    return this._selectedDanie;
  }

  public set selectedDanie(value: DaniaAll) {
    if (!value && !!this.accordion) {
      this.accordion.closeAll();
    }
    this._selectedDanie = value;
  }

  TYPY_DIET_INDEX = TypyDietIndex;
  panelStateSniadanie = false;
  panelStateDrugieSniadanie = false;
  panelStateObiad = false;
  panelStatePodwieczorek = false;
  panelStateKolacja = false;


  constructor() { }

  ngOnInit(): void { }


}

