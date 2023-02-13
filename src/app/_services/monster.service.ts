import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Monster } from '../monster/monster';

@Injectable()
export class MonsterService {
  BASE_URL: string = 'http://localhost:3000/monsters';

  constructor(private http: HttpClient) { }

  private log(response: Monster[] | Monster | undefined) {
    console.log(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getMonsterList(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.BASE_URL).pipe(
      catchError((error) => this.handleError(error, []))
    );
  }

  getMonsterById(monsterId: string): Observable<Monster | undefined> {
    return this.http.get<Monster>(`${this.BASE_URL}/${monsterId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updateMonster(monster: Monster): Observable<Monster | undefined>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.BASE_URL}/update/me`, monster, httpOptions).pipe(
      tap((response) => console.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  getMonsterRoleList(): string[] {
    return [
      "Alchimiste",
      "Archer",
      "Assassin",
      "Espion",
      "Guerrier",
      "Necromancien",
      "Soigneur",
      "Sorcier"
    ]
  }

  getMonsterRaceList(): string[] {
    return [
      "Démon",
      "Lycanthrope",
      "Vampire",
      "Orc",
      "Gobelin",
      "Elfe",
      "Dragon",
      "Harpie",
      "Goule"
    ]
  }
}