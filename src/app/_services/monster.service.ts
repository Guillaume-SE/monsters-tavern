import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { IMonster, IMonsterProfil } from 'src/app/_interfaces/monster';

@Injectable()
export class MonsterService {
  BASE_URL: string = 'http://localhost:3000/monsters';

  constructor(
    private http: HttpClient
  ) { }

  private log(response: IMonster[] | IMonster | undefined) {
    console.log(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getMonsterList(): Observable<IMonster[]> {
    return this.http.get<IMonster[]>(this.BASE_URL).pipe(
      catchError((error) => this.handleError(error, []))
    );
  }

  getMonsterById(monsterId: string | null): Observable<IMonster> {
    return this.http.get<IMonster>(`${this.BASE_URL}/${monsterId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  searchMonsterList(term: string): Observable<IMonsterProfil[]> {
    if (term.length <= 1) {
      return of([]);
    }
    return this.http.get<IMonsterProfil[]>(`http://localhost:3000/search/${term}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updateMonster(monster: IMonsterProfil): Observable<IMonsterProfil> {
    return this.http.patch<IMonsterProfil>(`${this.BASE_URL}/update/${monster._id}`, monster).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  deleteAccount(monsterId: string) {
    return this.http.delete(`${this.BASE_URL}/delete/${monsterId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  getMonsterRoleList(): Array<string> {
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

  getMonsterRaceList(): Array<string> {
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

  getAvatarList(): Array<string> {
    return [
      "demon",
      "werewolf",
      "dragon",
      "elf",
      "tree",
      "yeti",
      "orc",
      "gorgon",
      "minotaur",
      "reaper"
    ]
  }
}
