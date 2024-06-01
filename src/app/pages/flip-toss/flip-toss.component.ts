import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { generateMatchId } from '../../utils/match-utils';

@Component({
  selector: 'app-flip-toss',
  templateUrl: './flip-toss.component.html',
  styleUrl: './flip-toss.component.css',
})
export class FlipTossComponent {
  matchId?: string;
  team1: any;
  team2: any;
  tossResult: any;
  selectedTeam: string = '';
  tossDescision: string = '';

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

    console.log('team1', this.team1);
    console.log('team2', this.team2);
    this.initialSelect();
  }

  initialSelect() {
    this.tossResult = this.team1;
    this.selectedTeam = this.tossResult.name;
    localStorage.setItem('tossWinner', JSON.stringify(this.tossResult));
  }

  onSelectionChange(event: any): void {
    this.tossDescision = event.value;
    console.log(this.tossDescision);
    localStorage.setItem('tossSelection', JSON.stringify(this.tossDescision));
  }

  startMatch() {
    this.router.navigate([`/play/${this.matchId}`]);
  }
}
