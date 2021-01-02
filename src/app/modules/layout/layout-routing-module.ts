import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService as AuthGuard } from './../services/auth-services/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: '', component: LoginComponent },
      {
        path: 'jadlospis',
        loadChildren: () => import('./../jadlospis/jadlospis.module').then(m => m.JadlospisModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dodaj-produkty',
        loadChildren: () => import('./../dodaj-produkty/dodaj-produkty.module').then(m => m.DodajProduktyModule),
        canActivate: [AuthGuard]
      },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'logout', component: LogoutComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
