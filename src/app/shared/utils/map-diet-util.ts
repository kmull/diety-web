import { JadlospisModel } from "src/app/models/jadlospis-model";

export class MapDietyUtil {

  public static mapDiety(diety: JadlospisModel[]): JadlospisModel[] {
    const jadlospis: JadlospisModel[] = [];
    diety.forEach(f => {
      const dietaFromJson = JSON.parse(f.toString());
      if (!!dietaFromJson) {
        if (!!dietaFromJson.sniadanie) {
          dietaFromJson.sniadanie = this.mapData(dietaFromJson.sniadanie).trim();
        }
        if (!!dietaFromJson.drugieSniadanie) {
          dietaFromJson.drugieSniadanie = this.mapData(dietaFromJson.drugieSniadanie).trim();
        }
        if (!!dietaFromJson.obiad) {
          dietaFromJson.obiad = this.mapData(dietaFromJson.obiad).trim();
        }
        if (!!dietaFromJson.podwieczorek) {
          dietaFromJson.podwieczorek = this.mapData(dietaFromJson.podwieczorek).trim();
        }
        if (!!dietaFromJson.kolacja) {
          dietaFromJson.kolacja = this.mapData(dietaFromJson.kolacja).trim();
        }
      }
      jadlospis.push(dietaFromJson);
    });
    return jadlospis;

  }

  private static mapData(danie): string {
    let potrawa = '';
    for (let mealName of Object.keys(danie)) {
      if (!!danie[mealName] && mealName !== 'dzien')
        potrawa += `${danie[mealName]}, `;
    }
    return potrawa.trim().slice(0, potrawa.length - 1);
  }
}

