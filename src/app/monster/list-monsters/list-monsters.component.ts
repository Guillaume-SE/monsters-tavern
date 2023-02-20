import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';

import { IMonster } from 'src/app/_interfaces/monster';
import { IDecodedToken, IToken } from 'src/app/_interfaces/token';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-list-monsters',
  templateUrl: './list-monsters.component.html'
})
export class ListMonstersComponent implements OnInit {
  monsterList: IMonster[] = [];
  isLoggedIn: boolean = false;
  loggedMonsterId: IDecodedToken;

  constructor(
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {

    if (this.tokenService.isLogged()) {
      this.isLoggedIn = true
    }

    this.monsterService.getMonsterList()
      .subscribe((monsterList) => this.monsterList = monsterList);

    if (this.isLoggedIn) {
      const token = this.tokenService.getToken();
      if (token) {
        const decodeToken = this.tokenService.decodeToken(token);
        this.loggedMonsterId = decodeToken;
      }
    }
  }

  goToMonsterProfil(monster: IMonster) {
    this.router.navigate(['/monster', monster._id]);
  }

}
