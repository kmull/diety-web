import { Podwieczorek } from './podwieczorek';
import { Obiad } from './obiad-model';
import { Sniadanie } from './sniadanie';

export class DaniaAll {
  dzien?: string;
  sniadanie?: Sniadanie;
  drugieSniadanie?: any;
  obiad?: Obiad;
  podwieczorek?: Podwieczorek;
  kolacja?: Sniadanie;

  constructor(dzien?: string) {
    this.dzien = dzien;
  }
}
