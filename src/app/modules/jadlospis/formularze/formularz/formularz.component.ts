import { Component, OnInit, Input } from '@angular/core';
import { DaniaAll } from '../../../../models/dania-all';

@Component({
  selector: 'app-formularz',
  templateUrl: './formularz.component.html',
  styleUrls: ['./formularz.component.scss']
})
export class FormularzComponent implements OnInit {

  @Input() dzien: string;
  @Input() selectedDanie: DaniaAll;
  @Input() isSecondBreakfast = false;
  @Input() isAfternoonSnack = false;

  panelOpenState = false;
  constructor() { }

  ngOnInit(): void { }

  save() { }

}

