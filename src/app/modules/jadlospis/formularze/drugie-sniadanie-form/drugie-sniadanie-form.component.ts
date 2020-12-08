import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class DrugieSniadanieFormComponent implements OnInit, OnChanges {

  @Input() dzien: string;
  @Input() selectedDrugieSniadanie: DrugieSniadanie;

  form: FormGroup;
  drugieSniadanie = new DrugieSniadanie();

  podwieczorekValues$ = this.mealDinnerService.getDinner(RodzajDaniaEnum.DRUGIE_SNIADANIE, MealTypeGeneralEnum.DRUGIE_SNIADANIE);
  drugieSniadanieModel: Model[] = [];

  constructor(
    private fb: FormBuilder,
    private posilekService: PosilekService,
    private mealDinnerService: MealDinnerService

  ) {
    this.podwieczorekValues$.subscribe(drugieSniadanie => this.drugieSniadanieModel = drugieSniadanie);

    this.form = this.fb.group({
      drugieSniadanie: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dzien && this.dzien) {
      this.resetuj();
    }
    if (changes.selectedPodwieczorek && this.selectedDrugieSniadanie) {
      this.setDrugieSniadanieValues();
    }
  }

  ngOnInit(): void { }

  setDrugieSniadanieValues() {
    this.form.get('drugieSniadanie').setValue(this.drugieSniadanie.drugieSniadanie);
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
