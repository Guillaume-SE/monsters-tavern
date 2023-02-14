import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';

import { IMonster } from 'src/app/_interfaces/monster';

@Component({
  selector: 'app-edit-monster',
  templateUrl: './edit-monster.component.html',
  styleUrls: ['./edit-monster.component.scss']
})
export class EditMonsterComponent {

  monster: IMonster | undefined;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService
  ) { }

  ngOnInit() {
    const monsterId: string | null = this.route.snapshot.paramMap.get('id');
    if (monsterId) {
      this.monsterService.getMonsterById(monsterId)
        .subscribe(monster => this.monster = monster);
    } else {
      this.monster = undefined;
    }
  }
}
