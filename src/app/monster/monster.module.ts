import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ListMonstersComponent } from './list-monsters/list-monsters.component';
import { DetailMonsterComponent } from './detail-monster/detail-monster.component';
import { RouterModule, Routes } from '@angular/router';
import { MonsterService } from './monster.service';
import { MonsterFormComponent } from './monster-form/monster-form.component';
import { EditMonsterComponent } from './edit-monster/edit-monster.component';

const monsterRoutes: Routes = [
  { path: 'edit/monster/:id', component: EditMonsterComponent},
  { path: 'monsters', component: ListMonstersComponent },
  { path: 'monster/:id', component: DetailMonsterComponent}
];

@NgModule({
  declarations: [
    ListMonstersComponent,
    DetailMonsterComponent,
    MonsterFormComponent,
    EditMonsterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(monsterRoutes)
  ],
  providers: [
    MonsterService
  ]
})
export class MonsterModule { }
