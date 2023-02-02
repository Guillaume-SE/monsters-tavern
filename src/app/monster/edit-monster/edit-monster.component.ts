import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-edit-monster',
  templateUrl: './edit-monster.component.html',
  styleUrls: ['./edit-monster.component.scss']
})
export class EditMonsterComponent {

  monster: Monster | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService
  ) { }

  ngOnInit() {
    const monsterId: string | null = this.route.snapshot.paramMap.get('id');
    if(monsterId) {
      this.monster = this.monsterService.getMonsterById(monsterId);
    } else {
      this.monster = undefined;
    }
  }
}
