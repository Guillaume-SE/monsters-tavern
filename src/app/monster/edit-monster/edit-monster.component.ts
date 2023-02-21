import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';

import { IMonster } from 'src/app/_interfaces/monster';
import { IDecodedToken } from 'src/app/_interfaces/token';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-edit-monster',
  templateUrl: './edit-monster.component.html',
  styleUrls: ['./edit-monster.component.scss']
})
export class EditMonsterComponent implements OnInit {
  @Input() monster: IMonster;
  monsterRole: string[];
  monsterRace: string[];
  monsterProfilId: string | null;
  loggedMonsterId: IDecodedToken['id'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.monsterProfilId = this.route.snapshot.paramMap.get('monsterId');

    if (this.monsterProfilId) {
      this.monsterService.getMonsterById(this.monsterProfilId)
        .subscribe(monster => this.monster = monster);
    }

    if (this.isLogged()) {
      const token = this.tokenService.getToken();
      if (token) {
        const decodeToken = this.tokenService.decodeToken(token);
        this.loggedMonsterId = decodeToken;
      }
    }

    this.monsterRole = this.monsterService.getMonsterRoleList();
    this.monsterRace = this.monsterService.getMonsterRaceList();
  }

  isLogged() {
    if(this.tokenService.isLogged()) {
      return true;
    }
    return false;
  }

  onHisProfil() {
    if (this.monsterProfilId == this.loggedMonsterId) {
      return true;
    }
    this.router.navigate(['home/monsters']);
    return false;
  }

  hasRole(role: string): boolean {
    return this.monster.role.includes(role);
  }

  hasRace(race: string): boolean {
    return this.monster.race.includes(race);
  }

  selectRole($event: Event, role: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.monster.role = role;
    }
  }

  selectRace($event: Event, race: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.monster.race = race;
    }
  }

  onSubmit() {
    this.monsterService.updateMonster(this.monster)
      .subscribe((monster) => {
        if (monster) {
          this.router.navigate(['/monster/profil/', this.monster._id])
        }
      });
  }
}
