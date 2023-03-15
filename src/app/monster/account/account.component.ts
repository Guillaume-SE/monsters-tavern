import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IMonster, IMonsterProfil } from 'src/app/_interfaces/monster';
import { IDecodedToken } from 'src/app/_interfaces/token';

import { AuthService } from 'src/app/_services/auth.service';
import { FollowService } from 'src/app/_services/follow.service';
import { MonsterService } from 'src/app/_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  monster: IMonster;
  loggedMonsterId: IDecodedToken['id'];
  monsterProfilId: string | null;
  followingList: IMonsterProfil[];
  followerList: IMonsterProfil[];
  isFollower: boolean;
  isFollowing: boolean;
  followingCount: number;
  followerCount: number;
  showFollowing: boolean = false;
  showFollower: boolean = false;

  constructor(
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService,
    private authService: AuthService,
    private followService: FollowService,
  ) { }

  ngOnInit() {

    if (this.isLogged()) {
      const token = this.tokenService.getToken();
      if (token) {
        const decodeToken = this.tokenService.decodeToken(token);
        this.loggedMonsterId = decodeToken;
      }
      this.showMonsterProfil(this.loggedMonsterId);
    }
  }

  isLogged() {
    return this.tokenService.isLogged() ? true : false;
  }

  goToEditMonster() {
    this.router.navigate(['monster/edit', this.loggedMonsterId]);
  }

  logout() {
    this.authService.logout();
  }

  goToDeleteMonster() {
    this.router.navigate(['monster/delete', this.loggedMonsterId]);
  }

  showMonsterProfil(monsterId: string) {
    this.monsterService.getMonsterById(monsterId)
      .subscribe((monster) => {
        this.monster = monster,
          this.monsterProfilId = monster._id
      })

      this.followService.getMonsterFollowingList(monsterId)
        .subscribe((followingList) => {
          this.followingList = followingList,
            this.followingCount = followingList.length;
            this.isFollowing = followingList.some(monster => monster._id === this.loggedMonsterId);
        });

      this.followService.getMonsterFollowerList(monsterId)
        .subscribe((followerList) => {
          this.followerList = followerList,
            this.followerCount = followerList.length;
            this.isFollower = followerList.some(monster => monster._id === this.loggedMonsterId);
        });
    }
    goToMonsterProfil(monsterId: string) {
      this.router.navigate(['monster/profil/', monsterId]);
    }

    showMonsterFollowing() {
      this.showFollowing = !this.showFollowing;
    }
    showMonsterFollower() {
      this.showFollower = !this.showFollower;
    }
}
