import { FormularzComponent } from './formularze/formularz/formularz.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CdkTableModule } from '@angular/cdk/table';
import { JadlospisRoutingModule } from './jadlospis-routing.module';
import { TabelaJadlospisComponent } from './tabela-jadlospis/tabela-jadlospis.component';
import { MatCardModule } from '@angular/material/card';
import { SniadanieComponent } from './formularze/sniadanie/sniadanie.component';
import { ObiadFormComponent } from './formularze/obiad/obiad-form.component';
import { DrugieSniadanieFormComponent } from './formularze/drugie-sniadanie-form/drugie-sniadanie-form.component';
import { PodwieczorekFormComponent } from './formularze/podwieczorek/podwieczorek-form.component';
import { MatIconModule } from '@angular/material/icon';
import { JadlospisDashboardComponent } from './dashboard/jadlospis-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ZapiszModalComponent } from './tabela-jadlospis/zapisz-modal/zapisz-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ZapisaneDietyModalComponent } from './tabela-jadlospis/zapisane-diety-modal/zapisane-diety-modal.component';
import { PodgladDietModalComponent } from './tabela-jadlospis/podglad-diet-modal/podglad-diet-modal.component';
import { PrzyciskiComponent } from './tabela-jadlospis/przyciski/przyciski.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TabelaJadlospisComponent,
    FormularzComponent,
    SniadanieComponent,
    ObiadFormComponent,
    DrugieSniadanieFormComponent,
    PodwieczorekFormComponent,
    JadlospisDashboardComponent,
    ZapiszModalComponent,
    ZapisaneDietyModalComponent,
    PodgladDietModalComponent,
    PrzyciskiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    JadlospisRoutingModule
  ]
})
export class JadlospisModule { }
