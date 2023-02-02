import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-monster-form',
  templateUrl: './monster-form.component.html',
  styleUrls: ['./monster-form.component.scss']
})
export class MonsterFormComponent implements OnInit {
  @Input() monster: Monster;
  monsterRole: string[];

  constructor(
    private monsterService: MonsterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.monsterRole = this.monsterService.getMonsterRoleList();
  }

  hasRole(role: string): boolean {
    return this.monster.role.includes(role);
  }

  selectRole($event: Event, role: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.monster.role = role;
    }
  }

  isRoleValid(role: string): boolean {

    if (this.monster.role.length == 1 && this.hasRole(role)) {
      return false;
    }

    if (this.monster.role.length < 1 && !this.hasRole(role)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    console.log("Le formulaire a été soumis");
    this.router.navigate(['/monster', this.monster.id]);
  }
}
