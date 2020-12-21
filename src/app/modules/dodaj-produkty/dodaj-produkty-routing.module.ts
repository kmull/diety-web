import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DodajProduktyDashboardComponent } from './dashboard/dodaj-produkty-dashboard.component';


const routes: Routes = [
  {
    path: '', component: DodajProduktyDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DodajProduktyRoutingModule { }
