import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    // console.log('menu ->' + this.isLoggedIn);
    this.authenticationService.setLoginStatus(this.authenticationService.isUserLoggedIn())

    this.authenticationService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  handleLogout() {
    this.authenticationService.logout();
  }

  handleLogin() {
    setTimeout(() => {
      this.isLoggedIn = this.authenticationService.isUserLoggedIn();
      console.log('this.isLoggedIn', this.isLoggedIn)
    }, 100);
  }
}
