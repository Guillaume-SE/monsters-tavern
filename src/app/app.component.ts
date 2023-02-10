import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  isLoggedIn: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  isLogged() {
    if(this.tokenService.isLogged()) {
      return true;
    }
    return false;
  }

  goToSignup() {
    return this.router.navigate(['signup']);
  }

  goToLogin() {
    return this.router.navigate(['/login']);
  }
}
