import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monster } from '../monster';
import { MonsterService } from '../../_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-detail-monster',
  templateUrl: './detail-monster.component.html'
})
export class DetailMonsterComponent implements OnInit {

  monsterList: Monster[];
  monster: Monster | undefined;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    const monsterId: string | null = this.route.snapshot.paramMap.get('id');

    if (monsterId) {
      this.monsterService.getMonsterById(monsterId)
        .subscribe((monster) => this.monster = monster);
    }
  }

  goToEditMonster(monster: Monster) {
    this.router.navigate(['/edit/monster', monster._id]);
  }

  logout() {
    this.tokenService.deleteToken();
  }

  isLogged() {
    if(this.tokenService.isLogged())  {
      return true;
    }
    return false;
  }
}
