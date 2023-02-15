import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { IMonsterProfil } from '../_interfaces/monster';

@Injectable()
export class FollowService {

  BASE_URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getMonsterFollowingList(monsterId: string | null): Observable<IMonsterProfil[]> {
    return this.http.get<IMonsterProfil[]>(`${this.BASE_URL}following/${monsterId}`);
  }

  getMonsterFollowerList(monsterId: string | null): Observable<IMonsterProfil[]> {
    return this.http.get<IMonsterProfil[]>(`${this.BASE_URL}followers/${monsterId}`);
  }
}
