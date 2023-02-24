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

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private monsterService: MonsterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.avatarList = this.monsterService.getAvatarList();
  }

  selectThisAvatar(pathName: string) {
    const BASE_PATH = "./assets/avatar/";
    const EXT = ".svg";
    const fullpath = `${BASE_PATH}${pathName}${EXT}`;
    this.form.avatar = fullpath;
  }

  onSubmit() {
    this.authService.signup(this.form)
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
