import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MealDinnerService } from '../../services/meal-dinner.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Model } from '../../../models/model';
import { RodzajDaniaEnum } from '../../../models/enums/rodzaj-dania-enum';
import { MealTypeGeneralEnum } from '../../../models/enums/meal-type-general-enum';
import { SniadanieConst } from '../../../models/objects/sniadanie-const';
import { DrugieSniadanieConst } from '../../../models/objects/drugie-sniadanie-const';
import { ObiadConst } from '../../../models/objects/obiad-const';
import { MealTypeEnum } from '../../../models/enums/meal-type-enum';

@Component({
  selector: 'app-edytowanie',
  templateUrl: './edytowanie.component.html',
  styleUrls: ['./edytowanie.component.scss']
})
export class EdytowanieComponent implements OnInit {

  selectedMealType: string;
  selectedType: string;

  meal: Model = new Model();
  modelList: Model[];
  rodzajDaniaEnum = RodzajDaniaEnum;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    skladnik: ['', Validators.required]
  });

  mealTypeOption = [
    { name: RodzajDaniaEnum.SNIADANIE },
    { name: RodzajDaniaEnum.DRUGIE_SNIADANIE },
    { name: RodzajDaniaEnum.OBIAD },
    { name: RodzajDaniaEnum.PODWIECZOREK },
  ];

  typeOptions: { name: string }[];

  obiadValues$: any;
  soup: Model[];
  obiadGlowne: Model[];
  surowka: Model[];
  dodatki: Model[];

  $sniadanieValues: any;
  pieczywo: Model[];
  sniadanieGlowne: Model[];
  nabial: Model[];
  wedlina: Model[];
  warzywo: Model[];

  podwieczorekValues$ = this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeGeneralEnum.PODWIECZOREK);
  podwieczorek: Model[];

  drugieSniadanieValues$ = this.mealDinnerService.getDinner(RodzajDaniaEnum.DRUGIE_SNIADANIE, MealTypeGeneralEnum.DRUGIE_SNIADANIE);
  drugieSniadanie: Model[];

  constructor(
    private mealDinnerService: MealDinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // tslint:disable-next-line: deprecation
    this.obiadValues$ = forkJoin(
      this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.ZUPA),
      this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.DANIE_GLOWNE),
      this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.SUROWKA),
      this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.DODATKI)
    ).pipe(
      map(([soup, dinner, salad, additions]) => {
        return { soup, dinner, salad, additions };
      })
    );

    // tslint:disable-next-line: deprecation
    this.$sniadanieValues = forkJoin(
      this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeGeneralEnum.PIECZYWO),
      this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeGeneralEnum.DANIE_GLOWNE),
      this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeGeneralEnum.NABIAL),
      this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeGeneralEnum.WEDLINA),
      this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeGeneralEnum.WARZYWO)
    ).pipe(
      map(([pieczywo, danieGlowne, nabial, wedlina, warzywo]) => {
        return { pieczywo, danieGlowne, nabial, wedlina, warzywo };
      })
    );
  }


  addObiadValues$(type?): void {
    this.obiadValues$.subscribe(values => {
      this.soup = values.soup;
      this.obiadGlowne = values.dinner;
      this.surowka = values.salad;
      this.dodatki = values.additions;
      if (type) {
        this.selectSniadanie(type);
      }
    });
  }

  addSniadanieValues$(type?): void {
    this.$sniadanieValues.subscribe(values => {
      this.pieczywo = values.pieczywo;
      this.sniadanieGlowne = values.danieGlowne;
      this.nabial = values.nabial;
      this.wedlina = values.wedlina;
      this.warzywo = values.warzywo;
      if (type) {
        this.selectSniadanie(type);
      }
    });
  }

  addPodwieczorekValues$(type?): void {
    this.podwieczorekValues$.subscribe(values => {
      this.podwieczorek = values;
      if (type) {
        this.modelList = this.podwieczorek;
      }
    });
  }

  addDrugieSniadanieValues$(type?): void {
    this.drugieSniadanieValues$.subscribe(values => {
      this.drugieSniadanie = values;
      if (type) {
        this.modelList = this.drugieSniadanie;
      }
    });
  }

  changeMealtype(mealType): void {
    this.selectedMealType = mealType;
    this.selectedType = mealType;
    switch (mealType) {
      case RodzajDaniaEnum.SNIADANIE:
        this.typeOptions = SniadanieConst;
        this.addSniadanieValues$(this.selectedType);
        break;
      case RodzajDaniaEnum.DRUGIE_SNIADANIE:
        this.typeOptions = DrugieSniadanieConst;
        this.addDrugieSniadanieValues$(this.selectedType);
        this.modelList = this.drugieSniadanie;
        break;
      case RodzajDaniaEnum.OBIAD:
        this.typeOptions = ObiadConst;
        this.addObiadValues$(this.selectedType);
        break;
      case RodzajDaniaEnum.PODWIECZOREK:
        this.typeOptions = SniadanieConst;
        this.addPodwieczorekValues$(this.selectedType);
        break;
      case RodzajDaniaEnum.KOLACJA:
        this.typeOptions = SniadanieConst;
        this.addPodwieczorekValues$(this.selectedType);
        break;
    }
  }

  changeType(type): void {
    this.selectedType = type;
    switch (this.selectedMealType) {
      case RodzajDaniaEnum.SNIADANIE:
        this.selectSniadanie(this.selectedType);
        break;
      case RodzajDaniaEnum.OBIAD:
        this.selectObiad(this.selectedType);
        break;
      case RodzajDaniaEnum.PODWIECZOREK:
        this.modelList = this.podwieczorek;
        break;
      case RodzajDaniaEnum.DRUGIE_SNIADANIE:
        this.modelList = this.drugieSniadanie;
        break;
      case RodzajDaniaEnum.KOLACJA:
        this.selectedType = RodzajDaniaEnum.SNIADANIE;
        this.selectSniadanie(RodzajDaniaEnum.SNIADANIE);
        break;
    }
  }

  selectObiad(type): void {
    switch (type) {
      case MealTypeEnum.ZUPA:
        this.modelList = this.soup;
        break;
      case MealTypeEnum.DANIE_GLOWNE:
        this.modelList = this.obiadGlowne;
        break;
      case MealTypeEnum.SUROWKA:
        this.modelList = this.surowka;
        break;
      case MealTypeEnum.DODATKI:
        this.modelList = this.dodatki;
        break;
    }
  }

  selectSniadanie(type): void {
    switch (type) {
      case MealTypeEnum.PIECZYWO:
        this.modelList = this.pieczywo;
        break;
      case MealTypeEnum.ZUPA_MLECZNA || MealTypeEnum.DANIE_GLOWNE:
        this.modelList = this.sniadanieGlowne;
        break;
      case MealTypeEnum.NABIAL:
        this.modelList = this.nabial;
        break;
      case MealTypeEnum.WEDLINA:
        this.modelList = this.wedlina;
        break;
      case MealTypeEnum.WARZYWO:
        this.modelList = this.warzywo;
        break;
    }
  }

  changeModel(item: Model): void {
    this.meal = item;
    this.form.get('name').setValue(this.meal.name);
  }

  onSave(): void {
    this.meal.name = this.form.get('name').value;
    if (!!this.meal.name && !!this.selectedType) {
      this.mealDinnerService.saveMeal(this.selectedMealType, this.selectedType === MealTypeEnum.ZUPA_MLECZNA
        ? MealTypeEnum.DANIE_GLOWNE : this.selectedType, this.meal)
        .subscribe(() => {
          this.modelList = this.modelList.slice();
          this.meal = new Model();
          this.mealDinnerService.getDinner(this.selectedMealType, this.selectedType === MealTypeEnum.ZUPA_MLECZNA
            ? MealTypeEnum.DANIE_GLOWNE : this.selectedType)
            .subscribe(dishes => this.modelList = dishes);
          this.selectedType = null;
          this.form.reset();
        });
    }
  }

  onRemove(): void {
    if (!!this.meal.name && !!this.selectedType) {
      this.mealDinnerService.removeMeal(this.selectedMealType, this.meal)
        .subscribe(() => {
          this.changeMealtype(this.selectedMealType);
          this.modelList = this.modelList.filter(f => f.id !== this.meal.id).slice();
          this.mealDinnerService.getDinner(this.selectedMealType, this.selectedType === MealTypeEnum.ZUPA_MLECZNA
            ? MealTypeEnum.DANIE_GLOWNE : this.selectedType)
            .subscribe(dishes => this.modelList = dishes);
          this.meal = new Model();
          this.form.reset();
        });
    }
  }

}
