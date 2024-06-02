import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { generateMatchId } from '../../utils/match-utils';
import { Team } from '../../interfaces/team.interface';
import { SelectionEvent } from '../../interfaces/selectionEvent.interface';

@Component({
  selector: 'app-flip-toss',
  templateUrl: './flip-toss.component.html',
  styleUrl: './flip-toss.component.css',
})
export class FlipTossComponent {
  matchId!: string;
  team1!: Team;
  team2!: Team;
  tossResult!: Team;
  selectedTeam!: string;
  tossDescision!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.matchId = generateMatchId();
    const team1String = localStorage.getItem('team1');
    const team2String = localStorage.getItem('team2');

    if (team1String) {
      this.team1 = JSON.parse(team1String);
    }

    if (team2String) {
      this.team2 = JSON.parse(team2String);
    }
    this.initialSelect();
  }

  initialSelect() {
    this.tossResult = this.team1;
    this.selectedTeam = this.tossResult.name;
    localStorage.setItem('tossWinner', JSON.stringify(this.tossResult));
  }

  handleSelectionChange(event: SelectionEvent): void {
    this.tossDescision = event.value;
    localStorage.setItem('tossSelection', JSON.stringify(this.tossDescision));
  }

  beginPlaying() {
    this.router.navigate([`/play/${this.matchId}`]);
  }
}
