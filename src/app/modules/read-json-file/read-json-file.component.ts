// import { ObiadModel } from './../../models/obiad-model';
// import { SniadanieModel } from './../../models/sniadanie-model';
// import { PodwieczorekModel } from './../../models/podwieczorek-model';
import { Component, OnInit } from '@angular/core';
// import ObiadJson from '../../../assets/ObiadJson.json';
// import PodwieczorekJson from '../../../assets/PodwieczorekJson.json';
// import SniadanieJson from '../../../assets/SniadanieJson.json';
// import { PodtypEnum } from 'src/app/models/enums/podtyp-enum';

@Component({
  selector: 'app-read-json-file',
  templateUrl: './read-json-file.component.html',
  styleUrls: ['./read-json-file.component.scss']
})
export class ReadJsonFileComponent implements OnInit {

  // obiad: ObiadModel[];
  // sniadanie: SniadanieModel[];
  // podwieczorek: PodwieczorekModel[];

  constructor() { }

  ngOnInit(): void {

    // this.obiad = ObiadJson.DaniaObiadowe.map(e => e.podtyp = PodtypEnum[e.podtyp]);
    // this.obiad = ObiadJson.DaniaObiadowe;
    // this.sniadanie = SniadanieJson.sniadanie;
    // this.podwieczorek = PodwieczorekJson.Podwieczorek;

    // console.log('obiad', this.obiad);
    // console.log('sniadanie', this.sniadanie);
    // console.log('podwieczorek', this.podwieczorek);
  }


}
