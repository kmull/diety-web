import { DrugieSniadanieConst } from './../../../models/objects/drugie-sniadanie-const';
import { ObiadConst } from '../../../models/objects/obiad-const';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MealDinnerService } from '../../services/meal-dinner.service';
import { Model } from '../../../models/model';
import { RodzajDaniaEnum } from '../../../models/enums/rodzaj-dania-enum';
import { SniadanieConst } from '../../../models/objects/sniadanie-const';

@Component({
  selector: 'app-dodawanie',
  templateUrl: './dodawanie.component.html',
  styleUrls: ['./dodawanie.component.scss'],
})
export class DodawanieComponent implements OnInit {
  selectedMealType: string;
  selectedType: string;

  meal: Model = new Model();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  mealTypeOption = [
    { name: RodzajDaniaEnum.SNIADANIE },
    { name: RodzajDaniaEnum.DRUGIE_SNIADANIE },
    { name: RodzajDaniaEnum.OBIAD },
    { name: RodzajDaniaEnum.PODWIECZOREK },
    { name: RodzajDaniaEnum.KOLACJA },
  ];

  typeOption: { name: string }[];

  constructor(
    private mealDinnerService: MealDinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { }

  changeMealtype(mealType) {
    this.selectedMealType = mealType;
    switch (mealType) {
      case RodzajDaniaEnum.SNIADANIE:
        this.typeOption = SniadanieConst;
        break;
      case RodzajDaniaEnum.DRUGIE_SNIADANIE:
        this.selectedType = 'drugie-sniadanie';
        this.typeOption = DrugieSniadanieConst;
        // this.typeOption = SniadanieConst;
        break;
      case RodzajDaniaEnum.OBIAD:
        this.typeOption = ObiadConst;
        break;
      case RodzajDaniaEnum.PODWIECZOREK:
        this.typeOption = SniadanieConst;
        break;
      case RodzajDaniaEnum.KOLACJA:
        this.selectedMealType = RodzajDaniaEnum.SNIADANIE;
        this.typeOption = SniadanieConst;
        break;
    }
  }

  changeType(type) {
    this.selectedType = type;
  }

  onSave() {
    this.meal.name = this.form.get('name').value;
    if (this.form.valid) {
      this.mealDinnerService
        .saveMeal(this.selectedMealType, this.selectedType, this.meal)
        .subscribe(() => {
          // this.selectedType = null;
          this.meal = new Model();
          this.form.reset();
        });
    }
  }
}
