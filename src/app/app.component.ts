import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diety';

  constructor(public matPaginatorIntl: MatPaginatorIntl) { }

}
