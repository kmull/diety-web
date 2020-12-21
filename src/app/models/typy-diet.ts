import { DaniaAll } from './dania-all';
export class TypyDiet {
  nazwa: string;
  dieta: DaniaAll[];

  constructor(nazwa?: string, dieta?: DaniaAll[]) {
    this.nazwa = nazwa;
    this.dieta = dieta;
  }
}
