import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ICredential } from '../_interfaces/credential';

import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  message: string = "Connectez-vous";
  form: ICredential = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private location: Location
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.authService.login(this.form)
      .subscribe({
        next: data => {
          this.tokenService.saveToken(data.token);
          this.location.back();
        },
        error: error => {
          this.message = "Adresse email ou mot de passe incorrect"
        }
      })
  }
}
