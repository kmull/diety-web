import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
