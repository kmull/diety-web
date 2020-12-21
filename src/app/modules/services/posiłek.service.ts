import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Danie } from './../../models/danie';
import { RodzajDaniaEnum } from '../../models/enums/rodzaj-dania-enum';

@Injectable({
  providedIn: 'root'
})
export class PosilekService {

  danie: BehaviorSubject<Danie> = new BehaviorSubject<Danie>(null);

  setDanie(rodzajDania: string, danie: any) {
    this.danie.next(new Danie(rodzajDania, danie));
  }

  getDanie() {
    return this.danie.asObservable();
  }

}
