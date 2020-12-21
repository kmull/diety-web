import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPlPaginatorIntl } from './shared/paginator-pl';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    FormBuilder,
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: MatPaginatorIntl, useValue: getPlPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
