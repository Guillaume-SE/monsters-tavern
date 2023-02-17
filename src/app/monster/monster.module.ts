import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';

import { ListMonstersComponent } from './list-monsters/list-monsters.component';
import { DetailMonsterComponent } from './detail-monster/detail-monster.component';
import { MonsterFormComponent } from './monster-form/monster-form.component';
import { EditMonsterComponent } from './edit-monster/edit-monster.component';
import { LoaderComponent } from '../_utils/loader/loader.component';

import { MonsterService } from '../_services/monster.service';
import { FollowService } from '../_services/follow.service';
const monsterRoutes: Routes = [
  {
    path: 'edit/monster/:id',
    component: EditMonsterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'monsters',
    component: ListMonstersComponent
  },
  {
    path: 'monster/:id',
    component: DetailMonsterComponent
  }
];

@NgModule({
  declarations: [
    ListMonstersComponent,
    DetailMonsterComponent,
    MonsterFormComponent,
    EditMonsterComponent,
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
