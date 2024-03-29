import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';

import { IMonster } from 'src/app/_interfaces/monster';
import { IDecodedToken } from 'src/app/_interfaces/token';
import { ApiErrorService } from 'src/app/_subjects/api-error.service';

@Component({
  selector: 'app-edit-monster',
  templateUrl: './edit-monster.component.html'
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
  nameError: string;
  emailError: string;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService,
    private apiErrorService: ApiErrorService
  ) { }

  ngOnInit() {
    this.monsterProfilId = this.route.snapshot.paramMap.get('monsterId');
    this.avatarList = this.monsterService.getAvatarList();

    if (this.monsterProfilId) {
      this.monsterService.getMonsterById(this.monsterProfilId)
        .subscribe(monster => {
          this.form = monster;
          this.isLoading = false;
      });
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
    return this.tokenService.isLogged() ? true : false;
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

  ensureValidityOfPath(path: string): string {
    const allValidPaths = this.avatarList.map(avatarName => {
      return `${this.BASE_PATH}${avatarName}${this.PATH_EXT}`
    });

    const isValid = allValidPaths.includes(path);

    if (isValid) {
      return path;
    }

    return allValidPaths[Math.floor(Math.random() * allValidPaths.length)];
  }

  createErrorMessage(tag: string) {
    if(tag === "name") {
      this.nameError = "Ce nom est déjà utilisé";
    }
    if(tag === "email") {
      this.emailError = "Cet email est déjà utilisé";
    }
  }

  onSubmit() {
    this.nameError = "";
    this.emailError = "";
    this.apiErrorService.apiError.subscribe(data => {
      this.createErrorMessage(data);
    });

    this.monsterService.updateMonster({
      ...this.form,
      avatar: this.ensureValidityOfPath(this.form.avatar)
    }).subscribe({
      next: monster => {
        if (monster) {
          this.router.navigate(['/monster/profil/', this.form._id])
        }
      }
    })
  }
}
