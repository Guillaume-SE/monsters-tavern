import { Injectable, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { IDecodedToken, IToken } from '../_interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  isLogged(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  saveToken(token: string): void {
    return sessionStorage.setItem('token', token);
  }

  getToken(): IToken | null {
    return sessionStorage.getItem('token');
  }

  decodeToken(token: IToken): IDecodedToken {
    const id: string = jwt_decode(String(token));
    return { id };
  }
}
