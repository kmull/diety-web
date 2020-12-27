import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Podwieczorek } from './../../../../models/podwieczorek';
import { Model } from '../../../../models/model';
import { PosilekService } from '../../../services/posiłek.service';
import { RodzajDaniaEnum } from '../../../../models/enums/rodzaj-dania-enum';
import { MealDinnerService } from '../../../services/meal-dinner.service';
import { MealTypeGeneralEnum } from '../../../../models/enums/meal-type-general-enum';

@Component({
  selector: 'app-podwieczorek-form',
  templateUrl: './podwieczorek-form.component.html',
  styleUrls: ['./podwieczorek-form.component.scss']
})
export class PodwieczorekFormComponent implements OnInit, OnChanges {

  @Input() dzien: string;
  @Input() selectedPodwieczorek: Podwieczorek;

  form: FormGroup;
  podwieczorek = new Podwieczorek();

  podwieczorekValues$ = this.mealDinnerService.getDinner(RodzajDaniaEnum.PODWIECZOREK, MealTypeGeneralEnum.PODWIECZOREK);
  podwieczorekModel: Model[] = [];

  constructor(
    private fb: FormBuilder,
    private posilekService: PosilekService,
    private mealDinnerService: MealDinnerService

  ) {
    this.podwieczorekValues$.subscribe(podwieczorek => this.podwieczorekModel = [{ name: null }, ...podwieczorek]);

    this.form = this.fb.group({
      podwieczorek: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dzien && this.dzien) {
      this.resetuj();
    }
    if (changes.selectedPodwieczorek && this.selectedPodwieczorek) {
      this.setPodwieczorekValues();
    }
  }

  ngOnInit(): void { }

  setPodwieczorekValues() {
    this.form.get('podwieczorek').setValue(this.selectedPodwieczorek.podwieczorek);
  }

  save() {
    this.buildForm();
    this.posilekService.setDanie(RodzajDaniaEnum.PODWIECZOREK, this.podwieczorek);
  }

  buildForm() {
    this.podwieczorek.dzien = this.dzien;
    this.podwieczorek.podwieczorek = this.form.get('podwieczorek').value;
  }

  resetuj() {
    this.form.reset();
    this.podwieczorek = new Podwieczorek();
  }

}
