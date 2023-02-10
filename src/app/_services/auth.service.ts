import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ICredential } from '../_interfaces/credential';
import { IToken } from '../_interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LOGIN_URL: string = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  login(credentials: ICredential): Observable<IToken>{
    return this.http.post<IToken>(this.LOGIN_URL, credentials)
  }
}
