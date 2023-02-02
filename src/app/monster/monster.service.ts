import { Injectable } from '@angular/core';
import { MONSTERS } from './mock-monster-list';
import { Monster } from './monster';

@Injectable()
export class MonsterService {

  getMonsterList(): Monster[] {
    return MONSTERS;
  }

  getMonsterById(monsterId: string): Monster | undefined {
    return MONSTERS.find(monster => monster.id == monsterId);
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
}
