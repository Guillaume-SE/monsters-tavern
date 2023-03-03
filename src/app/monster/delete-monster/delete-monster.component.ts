import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MonsterService } from 'src/app/_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';
import { AuthService } from 'src/app/_services/auth.service';

import { IDecodedToken } from 'src/app/_interfaces/token';

@Component({
  selector: 'app-delete-monster',
  templateUrl: './delete-monster.component.html'
})
export class DeleteMonsterComponent implements OnInit {

  monsterProfilId: string | null;
  loggedMonsterId: IDecodedToken['id'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.monsterProfilId = this.route.snapshot.paramMap.get('monsterId');

    if (this.isLogged()) {
      const token = this.tokenService.getToken();
      if (token) {
        const decodeToken = this.tokenService.decodeToken(token);
        this.loggedMonsterId = decodeToken;
      }
    }
  }

  isLogged() {
    return this.tokenService.isLogged() ? true : false;
  }

  onHisProfil() {
      if (this.monsterProfilId == this.loggedMonsterId) {
        return true;
      }
      this.router.navigate(['home/monsters']);
      return false;
  }

  goToMonsterProfil() {
    this.router.navigate(['monster/profil', this.monsterProfilId]);
  }

  deleteMonster() {
    if(this.monsterProfilId) {
      this.monsterService.deleteAccount(this.monsterProfilId)
        .subscribe((monster) => {
          if(monster) {
            this.authService.logout();
          }
        });
    }
  }
}