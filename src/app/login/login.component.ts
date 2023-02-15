import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

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
  redirectUrl: any = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || '/';
  }

  onSubmit() {
    this.authService.login(this.form)
      .subscribe({
        next: data => {
          this.tokenService.saveToken(data.token);
          this.router.navigateByUrl(this.redirectUrl);
        },
        error: error => {
          this.message = "Adresse mail ou mot de passe incorrect"
        }
      })
  }
}
