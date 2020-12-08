import { RodzajDaniaEnum } from './enums/rodzaj-dania-enum';

export class Danie {
  rodzajDania?: RodzajDaniaEnum;
  danie?: any;

  constructor(rodzajDania?: RodzajDaniaEnum, danie?: any) {
    this.rodzajDania = rodzajDania;
    this.danie = danie;
  }

}
