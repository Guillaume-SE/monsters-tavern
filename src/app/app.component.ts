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

  ngOnInit() {}

  isLogged() {
    return this.tokenService.isLogged() ? true : false;
  }

  getMonsterLoggedId() {
    const token = this.tokenService.getToken();
    if (this.isLogged() && token) {
      const decodeToken = this.tokenService.decodeToken(token);
      return decodeToken;
    } return undefined;
  }
}
