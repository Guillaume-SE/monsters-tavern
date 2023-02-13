import { Component, OnInit } from '@angular/core';
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
    this.authService.login(this.form)
      .subscribe(
        data => {
          this.tokenService.saveToken(data.token);
        },
        error => console.log(error));
  }
}
