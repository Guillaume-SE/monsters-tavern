import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ICredential } from '../../_interfaces/credential';

import { AuthService } from '../../_services/auth.service';
import { TokenService } from '../../_services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  message: string = "Connectez-vous";
  errorMessage: string;
  form: ICredential = {
    email: '',
    password: ''
  }
  changetype: boolean = true;
  passwordVisible: boolean = true;
  iconShow: string = "./assets/general-icon/show-icon.svg";
  iconHide: string = "./assets/general-icon/hide-icon.svg";

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private location: Location
  ) { }

  ngOnInit(){ }

  viewPassword(): void {
    this.passwordVisible = !this.passwordVisible;
    this.changetype = !this.changetype;
  }

  onSubmit() {
    this.message = "Tentative de connexion...";
    this.authService.login(this.form)
      .subscribe({
        next: data => {
          this.tokenService.saveToken(data.token);
          this.location.back();
        },
        error: error => {
          this.message = "Connectez-vous"
          this.errorMessage = "Adresse email ou mot de passe incorrect"
        }
      })
  }
}
