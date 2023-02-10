import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Monster } from '../monster';
import { MonsterService } from '../../_services/monster.service';

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
    this.monsterService.getMonsterList()
      .subscribe((monsterList) => this.monsterList = monsterList);
  }

  goToMonsterProfil(monster: Monster) {
    this.router.navigate(['/monster', monster._id]);
  }

}
