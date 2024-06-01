import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  calculateTotalRuns,
  determineMatchWinner,
  randomRun,
} from '../../utils/match-utils';
import { MatchService } from '../../services/match/match.service';

@Component({
  selector: 'app-match-winner',
  templateUrl: './match-winner.component.html',
  styleUrl: './match-winner.component.css',
})
export class MatchWinnerComponent {
  team1: any;
  team2: any;
  tossWinner: any;
  innings: any[] = [];
  balls: number = 6;
  play: boolean = false;
  winner?: any;
  id: any = '';
  displayedColumns: string[] = ['ball', 'run'];
  tossDescision: string = '';
  tossSelection: string = '';

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
    });
    const team1String = localStorage.getItem('team1');
    const team2String = localStorage.getItem('team2');
    const tossWinnerString = localStorage.getItem('tossWinner');
    const tossSelectionString = localStorage.getItem('tossSelection');

    if (team1String) {
      this.team1 = JSON.parse(team1String);
    }

    if (team2String) {
      this.team2 = JSON.parse(team2String);
    }

    if (tossWinnerString) {
      this.tossWinner = JSON.parse(tossWinnerString);
    }

    if (tossSelectionString) {
      this.tossSelection = JSON.parse(tossSelectionString);
    }

    this.innings.push({ team: this.tossWinner, runs: [], totalRuns: 0 });
    console.log('initial call', this.tossWinner);

    if (this.tossWinner.name !== this.tossSelection) {
      this.tossDescision = 'bat';
    } else {
      this.tossDescision = 'bowl';
    }
  }

  playInning() {
    let currentInning = this.innings[this.innings.length - 1];
    console.log('current innings', currentInning);
    console.log(this.innings);
    for (let i = 1; i <= this.balls; i++) {
      let run = randomRun();
      currentInning.runs.push({ ball: i, run: run });
      currentInning.totalRuns += run;
    }

    if (this.innings.length === 1) {
      let secondTeam =
        this.tossWinner.name === this.team1.name ? this.team2 : this.team1;
      console.log('second team', secondTeam);
      let currentInning2 = this.innings.length;
      this.innings.push({ team: secondTeam, runs: [], totalRuns: 0 });
      console.log(this.innings[currentInning2]);
      for (let i = 1; i <= this.balls; i++) {
        let run = randomRun();
        this.innings[currentInning2].runs.push({ ball: i, run: run });
        this.innings[currentInning2].totalRuns += run;
      }
      this.innings[currentInning2].team = secondTeam;
    }
    this.play = true;

    this.winner = this.determineMatchWinner(this.innings);
    localStorage.setItem('winner', this.winner);

    const matchData = {
      id: this.id,
      tossWinner: this.tossWinner,
      team1: this.team1,
      team2: this.team2,
      innings: this.innings,
      matchWinner: this.winner,
    };
    console.log('Match data', matchData);

    this.matchService.postMatchData(matchData).subscribe((data) => {});
  }

  showResult() {
    console.log(this.innings);
    localStorage.setItem('innings', JSON.stringify(this.innings));
    this.route.navigate(['/result']);
  }

  playAgain() {
    this.route.navigate(['/']);
  }

  allMatches() {
    this.route.navigate(['/matches']);
  }

  calculateTotalRuns(runs: any[]): number {
    return calculateTotalRuns(runs);
  }

  determineMatchWinner(innings: any[]): string {
    return determineMatchWinner(innings);
  }
}
