import { RodzajDaniaEnum } from './enums/rodzaj-dania-enum';

export class Danie {
  rodzajDania?: string;
  danie?: any;

  constructor(rodzajDania?: string, danie?: any) {
    this.rodzajDania = rodzajDania;
    this.danie = danie;
  }

}
