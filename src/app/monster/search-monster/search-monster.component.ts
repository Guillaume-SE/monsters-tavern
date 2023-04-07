import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { IMonster, IMonsterProfil } from 'src/app/_interfaces/monster';
import { MonsterService } from 'src/app/_services/monster.service';

@Component({
  selector: 'app-search-monster',
  templateUrl: './search-monster.component.html'
})
export class SearchMonsterComponent implements OnInit {

  searchTerms = new Subject<string>();
  monsters$: Observable<IMonsterProfil[]>;

  constructor(
    private monsterService: MonsterService
  ) {}

  ngOnInit() {
    this.monsters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.monsterService.searchMonsterList(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }
}
