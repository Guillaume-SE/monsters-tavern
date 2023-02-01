import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListMonstersComponent } from './list-monsters/list-monsters.component';
import { DetailMonsterComponent } from './detail-monster/detail-monster.component';
import { RouterModule, Routes } from '@angular/router';

const monsterRoutes: Routes = [
  { path: 'monsters', component: ListMonstersComponent },
  { path: 'monster/:id', component: DetailMonsterComponent}
];

@NgModule({
  declarations: [
    ListMonstersComponent,
    DetailMonsterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(monsterRoutes)
  ]
})
export class MonsterModule { }
