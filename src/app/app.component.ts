import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDecodedToken } from './_interfaces/token';
import { TokenService } from './_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  loggedMonsterId: IDecodedToken['id'];

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {

    if (this.isLogged()) {
      const token = this.tokenService.getToken();
      if (token) {
        const decodeToken = this.tokenService.decodeToken(token);
        this.loggedMonsterId = decodeToken;
      }
    }
  }

  isLogged() {
    if(this.tokenService.isLogged()) {
      return true;
    }
    return false;
  }

  goToMonsterProfil(monsterId: string) {
    this.router.navigate(['/monster/profil', monsterId]);
  }
}
