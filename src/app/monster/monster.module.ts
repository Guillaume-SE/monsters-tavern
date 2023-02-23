import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';

import { ListMonstersComponent } from './list-monsters/list-monsters.component';
import { DetailMonsterComponent } from './detail-monster/detail-monster.component';
import { EditMonsterComponent } from './edit-monster/edit-monster.component';
import { LoaderComponent } from '../_utils/loader/loader.component';
import { DeleteMonsterComponent } from './delete-monster/delete-monster.component';

import { MonsterService } from '../_services/monster.service';
import { FollowService } from '../_services/follow.service';

const monsterRoutes: Routes = [
  {
    path: 'monster/edit/:monsterId',
    component: EditMonsterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'monster/delete/:monsterId',
    component: DeleteMonsterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/monsters',
    component: ListMonstersComponent
  },
  {
    path: 'monster/profil/:monsterId',
    component: DetailMonsterComponent
  }
];

@NgModule({
  declarations: [
    ListMonstersComponent,
    DetailMonsterComponent,
    EditMonsterComponent,
    DeleteMonsterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(monsterRoutes)
  ],
  providers: [
    MonsterService,
    FollowService
  ]
})
export class MonsterModule { }
