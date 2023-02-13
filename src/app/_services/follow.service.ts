import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { IFollow } from '../_interfaces/follow';

@Injectable()
export class FollowService {

  BASE_URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getMonsterFollowingList(monsterId: string | null): Observable<IFollow[]> {
    return this.http.get<IFollow[]>(`${this.BASE_URL}following/${monsterId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  getMonsterFollowerList(monsterId: string | null): Observable<IFollow[]> {
    return this.http.get<IFollow[]>(`${this.BASE_URL}followers/${monsterId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }
}
