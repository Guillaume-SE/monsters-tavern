import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MONSTERS } from '../mock-monster-list';
import { Monster } from '../monster';

@Component({
  selector: 'app-list-monsters',
  templateUrl: './list-monsters.component.html'
})
export class ListMonstersComponent {
  monsterList: Monster[] = MONSTERS;

  constructor(private router: Router) {}

  goToMonsterProfil(monster: Monster) {
    this.router.navigate(['/monster', monster.id]);
  }

}
