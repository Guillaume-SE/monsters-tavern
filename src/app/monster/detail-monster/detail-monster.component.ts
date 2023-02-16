import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';
import { FollowService } from 'src/app/_services/follow.service';

import { IMonster, IMonsterProfil } from 'src/app/_interfaces/monster';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-detail-monster',
  templateUrl: './detail-monster.component.html'
})
export class DetailMonsterComponent implements OnInit {

  monsterList: IMonster[] = [];
  monster: IMonster | undefined;
  followingList: IMonsterProfil[] = [];
  followerList: IMonsterProfil[] = [];
  followingCount: number;
  followerCount: number;
  isLoggedIn: boolean = false;
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
    const monsterId: string | null = this.route.snapshot.paramMap.get('id');

    if (this.tokenService.isLogged()) {
      this.isLoggedIn = true
    }

    if (monsterId) {
      this.monsterService.getMonsterById(monsterId)
        .subscribe((monster) => this.monster = monster);
    }

    if (monsterId && this.isLoggedIn) {
      this.followService.getMonsterFollowingList(monsterId)
        .subscribe((followingList) => {
          this.followingList = followingList,
            this.followingCount = followingList.length;
        });

      this.followService.getMonsterFollowerList(monsterId)
        .subscribe((followerList) => {
          this.followerList = followerList,
            this.followerCount = followerList.length;
        });
    }
  }

  goToEditMonster(monster: IMonster) {
    this.router.navigate(['/edit/monster', monster._id]);
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
