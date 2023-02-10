import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.router.navigate(['/monsters'])
  }

  isLogged(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/monsters']);
  }
}
