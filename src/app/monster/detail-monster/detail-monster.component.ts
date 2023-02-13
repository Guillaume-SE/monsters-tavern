import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monster } from '../monster';

import { MonsterService } from '../../_services/monster.service';
import { TokenService } from 'src/app/_services/token.service';
import { FollowService } from 'src/app/_services/follow.service';

import { IFollow } from 'src/app/_interfaces/follow';

@Component({
  selector: 'app-detail-monster',
  templateUrl: './detail-monster.component.html'
})
export class DetailMonsterComponent implements OnInit {

  monsterList: Monster[] = [];
  followingList: IFollow[] = [];
  followerList: IFollow[] = [];
  monster: Monster | undefined;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private tokenService: TokenService,
    private followService: FollowService
  ) { }

  ngOnInit() {
    const monsterId: string | null = this.route.snapshot.paramMap.get('id');

    if (monsterId) {
      this.monsterService.getMonsterById(monsterId)
        .subscribe((monster) => this.monster = monster);
    }
  }

  goToEditMonster(monster: Monster) {
    this.router.navigate(['/edit/monster', monster._id]);
  }

  logout() {
    this.tokenService.deleteToken();
  }

  isLogged() {
    if (this.tokenService.isLogged()) {
      return true;
    }
    return false;
  }

  showMonsterFollowing() {
    if (this.isLogged() && this.monster) {
      this.followService.getMonsterFollowingList(this.monster._id)
        .subscribe((followingList) => this.followingList = followingList);
    } else {
      this.router.navigate(['/login']);
    }
  }
  showMonsterFollower() {
    if (this.isLogged() && this.monster) {
      this.followService.getMonsterFollowerList(this.monster._id)
        .subscribe((followerList) => this.followerList = followerList);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
