import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MonsterService } from '../../_services/monster.service';

import { IMonster } from 'src/app/_interfaces/monster';

@Component({
  selector: 'app-edit-monster',
  templateUrl: './edit-monster.component.html',
  styleUrls: ['./edit-monster.component.scss']
})
export class EditMonsterComponent {
  @Input() monster: IMonster;
  monsterRole: string[];
  monsterRace: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService
  ) { }

  ngOnInit() {
    const monsterId: string | null = this.route.snapshot.paramMap.get('monsterId');
    if (monsterId) {
      this.monsterService.getMonsterById(monsterId)
        .subscribe(monster => this.monster = monster);
    }

    this.monsterRole = this.monsterService.getMonsterRoleList();
    this.monsterRace = this.monsterService.getMonsterRaceList();
  }

  hasRole(role: string): boolean {
    return this.monster.role.includes(role);
  }

  hasRace(race: string): boolean {
    return this.monster.race.includes(race);
  }

  selectRole($event: Event, role: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.monster.role = role;
    }
  }

  selectRace($event: Event, race: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.monster.race = race;
    }
  }

  onSubmit() {
    // this.monsterService.updateMonster(this.monster)
    //   .subscribe((monster) => {
    //     console.log(this.monster);
    //     if(monster) {
    //       this.router.navigate(['/monster', this.monster._id])
    //     }
    //   });
    console.log(this.monster)
  }
}
