import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { JadlospisDashboardComponent } from './dashboard/jadlospis-dashboard.component';

const routes: Routes = [
  {
    path: '', component: JadlospisDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JadlospisRoutingModule { }
