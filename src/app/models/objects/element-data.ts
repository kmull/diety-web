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
