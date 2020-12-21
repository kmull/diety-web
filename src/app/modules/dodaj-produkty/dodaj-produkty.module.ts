import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DodajProduktyRoutingModule } from './dodaj-produkty-routing.module';
import { DodajProduktyDashboardComponent } from './dashboard/dodaj-produkty-dashboard.component';
import { FormularzComponent } from './formularz/formularz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { DodawanieComponent } from './dodawanie/dodawanie.component';
import { EdytowanieComponent } from './edytowanie/edytowanie.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DodajProduktyDashboardComponent,
    FormularzComponent,
    DodawanieComponent,
    EdytowanieComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    DodajProduktyRoutingModule
  ]
})
export class DodajProduktyModule { }
