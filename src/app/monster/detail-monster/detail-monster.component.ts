import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-detail-monster',
  templateUrl: './detail-monster.component.html'
})
export class DetailMonsterComponent implements OnInit {

  monsterList: Monster[];
  monster: Monster | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService
  ) { }

  ngOnInit() {
    const monsterId: string | null = this.route.snapshot.paramMap.get('id');

    if (monsterId) {
      this.monster = this.monsterService.getMonsterById(monsterId);
    }
  }

  goToMonstersList() {
    this.router.navigate(['/monsters']);
  }

  goToEditMonster(monster: Monster) {
    this.router.navigate(['/edit/monster', monster.id]);
  }
}
