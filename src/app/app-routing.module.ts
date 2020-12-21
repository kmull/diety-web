import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    // loadChildren: '../app/modules/jadlospis/jadlospis.module#JadlospisModule'
    // loadChildren: () => import('./modules/jadlospis/jadlospis.module').then(m => m.JadlospisModule)
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
