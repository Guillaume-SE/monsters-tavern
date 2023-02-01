import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MONSTERS } from '../mock-monster-list';
import { Monster } from '../monster';

@Component({
  selector: 'app-detail-monster',
  templateUrl: './detail-monster.component.html',
  styleUrls: ['./detail-monster.component.scss']
})
export class DetailMonsterComponent implements OnInit {

  monsterList: Monster[] = [];
  monster: Monster | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.monsterList = MONSTERS;
    const monsterId: string | null = this.route.snapshot.paramMap.get('id');

    if (monsterId) {
      this.monster = this.monsterList.find(monster => monster.id == monsterId);
    }
  }

  goToMonstersList() {
    this.router.navigate(['/monsters']);
  }

}
