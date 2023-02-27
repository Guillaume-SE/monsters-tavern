import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { INewMonster } from 'src/app/_interfaces/monster';

import { AuthService } from 'src/app/_services/auth.service';
import { MonsterService } from 'src/app/_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  message: string = "Inscrivez-vous";
  avatarList: Array<string> = [];
  form: INewMonster = {
    name: '',
    email: '',
    password: '',
    role: '',
    race: '',
    avatar: ''
  }
  BASE_PATH: string = "./assets/avatar/";
  PATH_EXT: string = ".svg";

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private monsterService: MonsterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.avatarList = this.monsterService.getAvatarList();
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

  onSubmit() {
    this.authService.signup({
      ...this.form,
      avatar: this.ensureValidityOfPath(this.form.avatar)
    })
      .subscribe({
        next: data => {
          this.tokenService.saveToken(data.token);
          const monsterId = this.tokenService.decodeToken(data.token);
          this.router.navigate(['/monster/profil', monsterId]);
        },
        error: error => {
          console.log(error);
        }
      })
  }
}
