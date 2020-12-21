import { RodzajDaniaEnum } from './../../../../models/enums/rodzaj-dania-enum';
import { MealDinnerService } from '../../../services/meal-dinner.service';
import { Model } from './../../../../models/model';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PosilekService } from './../../../services/posiłek.service';
import { Obiad } from './../../../../models/obiad-model';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { MealTypeGeneralEnum } from '../../../../models/enums/meal-type-general-enum';

@Component({
  selector: 'app-obiad-form',
  templateUrl: './obiad-form.component.html',
  styleUrls: ['./obiad-form.component.scss']
})
export class ObiadFormComponent implements OnInit, OnChanges {

  @Input() dzien: string;
  @Input() selectedObiad: Obiad;

  form: FormGroup;

  soup: Model[] = [];
  danieGlowne: Model[] = [];
  napoj: Model[] = [];
  dodatki: Model[] = [];
  surowka: Model[] = [];

  obiad = new Obiad();

  // tslint:disable-next-line: deprecation
  obiadValues$ = forkJoin(
    this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.ZUPA),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.DANIE_GLOWNE),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.SUROWKA),
    this.mealDinnerService.getDinner(RodzajDaniaEnum.OBIAD, MealTypeGeneralEnum.DODATKI)
  ).pipe(
    map(([soup, dinner, salad, additions]) => {
      return { soup, dinner, salad, additions };
    })
  );

  constructor(
    private fb: FormBuilder,
    private mealDinnerService: MealDinnerService,
    private posilekService: PosilekService

  ) {
    this.obiadValues$.subscribe(values => {
      this.soup = [...values.soup];
      this.danieGlowne = [...values.dinner];
      this.surowka = [...values.salad];
      this.dodatki = [...values.additions];
      // this.soup = [new Model(), ...values.soup];
      // this.danieGlowne = [new Model(), ...values.dinner];
      // this.surowka = [new Model(), ...values.salad];
      // this.dodatki = [new Model(), ...values.additions];
    });

    this.form = this.fb.group({
      soup: [''],
      danieGlowne: [''],
      dodatki: [''],
      surowka: ['']
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dzien && this.dzien) {
      this.resetuj();
    }

    if (changes.selectedObiad && this.selectedObiad) {
      this.setObiadValues();
    }
  }

  private setObiadValues() {
    this.form.get('soup').setValue(this.selectedObiad.zupa);
    this.form.get('danieGlowne').setValue(this.selectedObiad.danieGlowne);
    this.form.get('dodatki').setValue(this.selectedObiad.dodatki);
    this.form.get('surowka').setValue(this.selectedObiad.surowka);
  }

  ngOnInit(): void { }

  save() {
    this.buildForm();
    this.posilekService.setDanie(RodzajDaniaEnum.OBIAD, this.obiad);
  }

  buildForm() {
    this.obiad.dzien = this.dzien;
    this.obiad.zupa = this.form.get('soup').value;
    this.obiad.danieGlowne = this.form.get('danieGlowne').value;
    this.obiad.dodatki = this.form.get('dodatki').value;
    this.obiad.surowka = this.form.get('surowka').value;
  }

  resetuj() {
    this.form.reset();
    this.obiad = new Obiad();
  }

}
