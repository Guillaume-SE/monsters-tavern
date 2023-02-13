import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  isLogged(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.router.navigate(['/monsters'])
  }

  getToken(): string | null{
    return sessionStorage.getItem('token');
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/monsters']);
  }
}
