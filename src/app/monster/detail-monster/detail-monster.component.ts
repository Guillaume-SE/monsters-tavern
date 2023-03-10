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

  monster: IMonster;
  monsterProfilId: string | null;
  followingList: IMonsterProfil[];
  followerList: IMonsterProfil[];
  isFollower: boolean;
  isFollowing: boolean;
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
      this.showMonsterProfil(this.monsterProfilId);
    }

    if (!this.monsterProfilId) {
      this.router.navigate(['home/monsters']);
    }
  }

  isLogged() {
    return this.tokenService.isLogged() ? true : false;
  }

  onHisProfil() {
    return this.monsterProfilId === this.loggedMonsterId ? true : false;
  }

  showMonsterProfil(monsterId: string) {
    this.monsterService.getMonsterById(monsterId)
      .subscribe((monster) => {
        this.monster = monster,
          this.monsterProfilId = monster._id
      })

    if (this.isLogged()) {
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
  }

  showMonsterFollowing() {
    this.showFollowing = !this.showFollowing;
  }
  showMonsterFollower() {
    this.showFollower = !this.showFollower;
  }

  followMonster(monsterId: string) {
    this.followService.follow(monsterId)
      .subscribe({
        error: error => {
          throw new Error(error);
        }
      });
      this.isFollower = true;
  }

  unfollowMonster(monsterId: string) {
    this.followService.unfollow(monsterId)
      .subscribe({
        error: error => {
          throw new Error(error);
        }
      });
      this.isFollower = false;
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
}
