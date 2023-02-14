import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';

import { IMonster } from 'src/app/_interfaces/monster';

@Component({
  selector: 'app-list-monsters',
  templateUrl: './list-monsters.component.html'
})
export class ListMonstersComponent implements OnInit {
  monsterList: IMonster[] | undefined;

  constructor(
    private router: Router,
    private monsterService: MonsterService
  ) {}

  ngOnInit() {
    this.monsterService.getMonsterList()
      .subscribe((monsterList) => this.monsterList = monsterList);
  }

  goToMonsterProfil(monster: IMonster) {
    this.router.navigate(['/monster', monster._id]);
  }

}
