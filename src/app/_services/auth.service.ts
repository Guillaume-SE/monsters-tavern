import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

import { ICredential } from '../_interfaces/credential';
import { INewMonster } from '../_interfaces/monster';
import { IToken } from '../_interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: string = 'http://localhost:3000/';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(credentials: ICredential): Observable<IToken> {
    return this.http.post<IToken>(`${this.BASE_URL}login`, credentials);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['home/monsters']);
  }

  signup(monster: INewMonster): Observable<IToken> {
    return this.http.post<IToken>(`${this.BASE_URL}signup`, monster);
  }
}
