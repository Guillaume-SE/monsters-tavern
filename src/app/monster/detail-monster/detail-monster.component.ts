import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';
import { FollowService } from 'src/app/_services/follow.service';
import { AuthService } from 'src/app/_services/auth.service';

import { IMonster, IMonsterProfil } from 'src/app/_interfaces/monster';
import { IDecodedToken } from 'src/app/_interfaces/token';

@Component({
  selector: 'app-detail-monster',
  templateUrl: './detail-monster.component.html'
})
export class DetailMonsterComponent implements OnInit {

  monster: IMonster | undefined;
  monsterProfilId: string | null;
  followingList: IMonsterProfil[] = [];
  followerList: IMonsterProfil[] = [];
  followingCount: number;
  followerCount: number;
  isLoggedIn: boolean = false;
  loggedMonsterId: IDecodedToken['id'];
  showFollowing: boolean = false;
  showFollower: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService,
    private followService: FollowService,
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

    if (this.monsterProfilId) {
      this.monsterService.getMonsterById(this.monsterProfilId)
        .subscribe((monster) => this.monster = monster);
    }

    if (this.monsterProfilId && this.isLogged()) {
      this.followService.getMonsterFollowingList(this.monsterProfilId)
        .subscribe((followingList) => {
          this.followingList = followingList,
            this.followingCount = followingList.length;
        });

      this.followService.getMonsterFollowerList(this.monsterProfilId)
        .subscribe((followerList) => {
          this.followerList = followerList,
            this.followerCount = followerList.length;
        });
    }
  }

  isLogged() {
    if(this.tokenService.isLogged()) {
      return true;
    }
    return false;
  }

  onHisProfil() {
    if(this.monsterProfilId === this.loggedMonsterId) {
      return true;
    }
    return false;
  }

  goToEditMonster(monster: IMonster) {
    this.router.navigate(['monster/edit', monster._id]);
  }

  logout() {
    this.authService.logout();
  }

  showMonsterFollowing() {
    this.showFollowing = !this.showFollowing;
  }
  showMonsterFollower() {
    this.showFollower = !this.showFollower;
  }
}
