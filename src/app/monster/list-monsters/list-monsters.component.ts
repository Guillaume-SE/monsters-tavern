import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-list-monsters',
  templateUrl: './list-monsters.component.html'
})
export class ListMonstersComponent implements OnInit {
  monsterList: Monster[] | undefined;

  constructor(
    private router: Router,
    private monsterService: MonsterService
  ) {}

  ngOnInit() {
    this.monsterList = this.monsterService.getMonsterList();
  }

  goToMonsterProfil(monster: Monster) {
    this.router.navigate(['/monster', monster.id]);
  }

}
