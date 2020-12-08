import { MealDinnerService } from './../../../services/meal-dinner.service';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sniadanie } from './../../../../models/sniadanie';
import { PosilekService } from './../../../services/posiłek.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Model } from '../../../../models/model';
import { MealTypeEnum } from '../../../../models/enums/meal-type-enum';
import { RodzajDaniaEnum } from '../../../../models/enums/rodzaj-dania-enum';

@Component({
  selector: 'app-sniadanie',
  templateUrl: './sniadanie.component.html',
  styleUrls: ['./sniadanie.component.scss']
})
export class SniadanieComponent implements OnInit, OnChanges {

  @Input() dzien: string;
  @Input() isKolacja = false;
  @Input() selectedSniadanie: Sniadanie;

  form: FormGroup;
  sniadanie: Sniadanie;

  glowne: Model[] = [];
  pieczywo: Model[] = [];
  wedlina: Model[] = [];
  warzywo: Model[] = [];
  napoj: Model[] = [];
  nabial: Model[] = [];

  // tslint:disable-next-line: deprecation
  sniadanieValues$ = forkJoin(
    this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeEnum.DANIE_GLOWNE),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeEnum.NAPOJ),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeEnum.PIECZYWO),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeEnum.WARZYWO),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeEnum.WEDLINA),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.SNIADANIE, MealTypeEnum.NABIAL)
  ).pipe(
    map(([mainMeal, drink, bread, vegetable, sausage, dairy]) => {
      return { mainMeal, drink, bread, vegetable, sausage, dairy };
    })
  );

  constructor(
    private fb: FormBuilder,
    private posilekService: PosilekService,
    private mealDinnerService: MealDinnerService
  ) {
    this.sniadanieValues$.subscribe(values => {
      this.glowne = values.mainMeal;
      this.napoj = values.drink;
      this.pieczywo = values.bread;
      this.warzywo = values.vegetable;
      this.wedlina = values.sausage;
      this.nabial = values.dairy;
    });

    this.form = this.fb.group({
      glowne: ['', Validators.required],
      pieczywo: [''],
      wedlina: [''],
      warzywo: [''],
      nabial: [''],
      napoj: ['']
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dzien && this.dzien) {
      this.resetuj();
    }

    if (changes.selectedSniadanie && this.selectedSniadanie) {
      this.setSniadanieValues();
    }
  }

  private setSniadanieValues() {
    this.form.get('glowne').setValue(this.selectedSniadanie.glowne);
    this.form.get('pieczywo').setValue(this.selectedSniadanie.pieczywo);
    this.form.get('wedlina').setValue(this.selectedSniadanie.wedlina);
    this.form.get('warzywo').setValue(this.selectedSniadanie.warzywo);
    this.form.get('nabial').setValue(this.selectedSniadanie.nabial);
    this.form.get('napoj').setValue(this.selectedSniadanie.napoj);
  }

  save() {
    this.buildForm();
    this.posilekService.setDanie(this.isKolacja ? RodzajDaniaEnum.KOLACJA : RodzajDaniaEnum.SNIADANIE, this.sniadanie);
    this.resetuj();
  }

  buildForm() {
    this.sniadanie.dzien = this.dzien;
    this.sniadanie.glowne = this.form.get('glowne').value;
    this.sniadanie.pieczywo = this.form.get('pieczywo').value;
    this.sniadanie.warzywo = this.form.get('warzywo').value;
    this.sniadanie.wedlina = this.form.get('wedlina').value;
    this.sniadanie.nabial = this.form.get('nabial').value;
    this.sniadanie.napoj = this.form.get('napoj').value;
  }

  resetuj() {
    this.form.reset();
    this.sniadanie = new Sniadanie();
  }

}
