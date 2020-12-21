import { DaniaAll } from "../dania-all";
import { DniTygodniaEnum } from "../enums/dni-tygodnia-enum";
import { JadlospisModel } from "../jadlospis-model";

export const ELEMENT_DATA: JadlospisModel[] = [
  { dzien: DniTygodniaEnum.PONIEDZIALEK },
  { dzien: DniTygodniaEnum.WTOREK },
  { dzien: DniTygodniaEnum.SRODA },
  { dzien: DniTygodniaEnum.CZWARTEK },
  { dzien: DniTygodniaEnum.PIATEK },
  { dzien: DniTygodniaEnum.SOBOTA },
  { dzien: DniTygodniaEnum.NIEDZIELA }
];


export const DANIA_ALL: DaniaAll[] = [
  new DaniaAll(DniTygodniaEnum.PONIEDZIALEK),
  new DaniaAll(DniTygodniaEnum.WTOREK),
  new DaniaAll(DniTygodniaEnum.SRODA),
  new DaniaAll(DniTygodniaEnum.CZWARTEK),
  new DaniaAll(DniTygodniaEnum.PIATEK),
  new DaniaAll(DniTygodniaEnum.SOBOTA),
  new DaniaAll(DniTygodniaEnum.NIEDZIELA)
];

