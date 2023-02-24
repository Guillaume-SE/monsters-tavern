import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';

import { IMonster, IMonsterProfil, INewMonster } from 'src/app/_interfaces/monster';
import { IDecodedToken } from 'src/app/_interfaces/token';

@Component({
  selector: 'app-edit-monster',
  templateUrl: './edit-monster.component.html',
  styleUrls: ['./edit-monster.component.scss']
})
export class EditMonsterComponent implements OnInit {

  form: IMonster = {
    _id: '',
    name: '',
    email: '',
    race: '',
    role: '',
    avatar: '',
    created_at: null,
    updated_at: null
  }
  monsterProfilId: string | null;
  avatarList: Array<string> = [];
  loggedMonsterId: IDecodedToken['id'];
  BASE_PATH: string = "./assets/avatar/";
  PATH_EXT: string = ".svg";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.monsterProfilId = this.route.snapshot.paramMap.get('monsterId');
    this.avatarList = this.monsterService.getAvatarList();

    if (this.monsterProfilId) {
      this.monsterService.getMonsterById(this.monsterProfilId)
        .subscribe(monster => this.form = monster);
    }

    if (this.isLogged()) {
      const token = this.tokenService.getToken();
      if (token) {
        const decodeToken = this.tokenService.decodeToken(token);
        this.loggedMonsterId = decodeToken;
      }
    }
  }

  isLogged() {
    if (this.tokenService.isLogged()) {
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

  selectThisAvatar(avatarName: string) {
    const fullpath = `${this.BASE_PATH}${avatarName}${this.PATH_EXT}`;
    this.form.avatar = fullpath;
  }
  
  onSubmit() {
    const allValidPaths = this.avatarList.map(avatarName => {
      return `${this.BASE_PATH}${avatarName}${this.PATH_EXT}`
    });

    const isValid = allValidPaths.includes(this.form.avatar)

    if (!isValid) {
      const randomPath = allValidPaths[Math.floor(Math.random() * allValidPaths.length)];
      this.form.avatar = randomPath;
    }

    this.monsterService.updateMonster(this.form)
      .subscribe((monster) => {
        if (monster) {
          this.router.navigate(['/monster/profil/', this.form._id])
        }
      });
  }
}
