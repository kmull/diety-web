import { LayoutComponent } from './layout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'jadlospis',
        loadChildren: () => import('./../jadlospis/jadlospis.module').then(m => m.JadlospisModule)
      },
      {
        path: 'dodaj-produkty',
        loadChildren: () => import('./../dodaj-produkty/dodaj-produkty.module').then(m => m.DodajProduktyModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
