import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Monster } from '../monster';
import { MonsterService } from '../../_services/monster.service';

@Component({
  selector: 'app-monster-form',
  templateUrl: './monster-form.component.html',
  styleUrls: ['./monster-form.component.scss']
})
export class MonsterFormComponent implements OnInit {
  @Input() monster: Monster;
  monsterRole: string[];
  monsterRace: string[];

  constructor(
    private monsterService: MonsterService,
    private router: Router
  ) { }

  ngOnInit() {
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
        // console.log(this.monster, "YO");
        // if(monster) {
        //   this.router.navigate(['/monster', this.monster._id])
        // }
      // });
  }
}
