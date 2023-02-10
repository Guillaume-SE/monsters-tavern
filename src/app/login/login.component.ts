import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ICredential } from '../_interfaces/credential';
import { TokenService } from '../_services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  // message: string = "Connectez-vous";
  form: ICredential = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);
    this.authService.login(this.form)
      .subscribe(
        data => {
          console.log(data.token);
          this.tokenService.saveToken(data.token);
        },
        error => console.log(error));
  }

  goToSignup() {
    return this.router.navigate(['signup']);
  }
  // setMessage() {
  //   if (this.auth.isLoggedIn) {
  //     this.message = "Vous êtes connecté.";
  //   } else {
  //     this.message = "Identifiant ou mot de passe incorrect.";
  //   }
  // }
}
