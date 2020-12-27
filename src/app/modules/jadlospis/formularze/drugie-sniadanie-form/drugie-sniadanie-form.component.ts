import { Component, Input } from '@angular/core';
import { DrugieSniadanie } from './../../../../models/drugie-sniadanie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RodzajDaniaEnum } from '../../../../models/enums/rodzaj-dania-enum';
import { MealTypeGeneralEnum } from '../../../../models/enums/meal-type-general-enum';
import { Model } from '../../../../models/model';
import { PosilekService } from '../../../services/posiłek.service';
import { MealDinnerService } from '../../../services/meal-dinner.service';

@Component({
  selector: 'app-drugie-sniadanie-form',
  templateUrl: './drugie-sniadanie-form.component.html',
  styleUrls: ['./drugie-sniadanie-form.component.scss']
})
export class DrugieSniadanieFormComponent {

  private _selectedDrugieSniadanie: DrugieSniadanie;
  @Input() public get selectedDrugieSniadanie(): DrugieSniadanie {
    return this._selectedDrugieSniadanie;
  }
  public set selectedDrugieSniadanie(value: DrugieSniadanie) {
    this._selectedDrugieSniadanie = value;
    if (!!value) {
      this.setDrugieSniadanieValues(value.drugieSniadanie);
    }
  }

  private _dzien: string;
  @Input() public get dzien(): string {
    return this._dzien;
  }
  public set dzien(value: string) {
    this._dzien = value;
    if (!!value) {
      this.resetuj();
    }
  }

  form: FormGroup;
  drugieSniadanie = new DrugieSniadanie();

  podwieczorekValues$ = this.mealDinnerService.getDinner(RodzajDaniaEnum.DRUGIE_SNIADANIE, MealTypeGeneralEnum.DRUGIE_SNIADANIE);
  drugieSniadanieModel: Model[] = [];

  constructor(
    private fb: FormBuilder,
    private posilekService: PosilekService,
    private mealDinnerService: MealDinnerService
  ) {
    this.podwieczorekValues$
      .subscribe(drugieSniadanie => this.drugieSniadanieModel = [{ name: null }, ...drugieSniadanie]);

    this.form = this.fb.group({
      drugieSniadanie: ['']
    });
  }

  setDrugieSniadanieValues(value: string) {
    this.form.get('drugieSniadanie').setValue(value);
  }

  save() {
    this.buildForm();
    this.posilekService.setDanie(RodzajDaniaEnum.DRUGIE_SNIADANIE, this.drugieSniadanie);
  }

  buildForm() {
    this.drugieSniadanie.dzien = this.dzien;
    this.drugieSniadanie.drugieSniadanie = this.form.get('drugieSniadanie').value;
  }

  resetuj() {
    this.form.reset();
    this.drugieSniadanie = new DrugieSniadanie();
  }

}
