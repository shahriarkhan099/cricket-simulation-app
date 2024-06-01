import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  calculateTotalRuns,
  determineMatchWinner,
  randomRun,
} from '../../utils/match-utils';
import { MatchService } from '../../services/match/match.service';
import { Team } from '../../interfaces/team.interface';
import { Inning } from '../../interfaces/inning.interface';
import { Run } from '../../interfaces/run.interface';

@Component({
  selector: 'app-match-winner',
  templateUrl: './match-winner.component.html',
  styleUrl: './match-winner.component.css',
})
export class MatchWinnerComponent {
  team1!: Team;
  team2!: Team;
  tossWinner!: Team;
  innings: Inning[] = [];
  balls: number = 6;
  play: boolean = false;
  winner?: string;
  id!: string | null;
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

    if (this.tossWinner.name !== this.tossSelection) {
      this.tossDescision = 'bat';
    } else {
      this.tossDescision = 'bowl';
    }
  }

  playInning() {
    let currentInning = this.innings[this.innings.length - 1];
    for (let i = 1; i <= this.balls; i++) {
      let run = randomRun();
      currentInning.runs.push({ ball: i, run: run });
      currentInning.totalRuns += run;
    }

    if (this.innings.length === 1) {
      let secondTeam =
        this.tossWinner.name === this.team1.name ? this.team2 : this.team1;
      let currentInning2 = this.innings.length;
      this.innings.push({ team: secondTeam, runs: [], totalRuns: 0 });
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

    this.matchService.postMatchData(matchData).subscribe((data) => {});
  }

  showResult() {
    localStorage.setItem('innings', JSON.stringify(this.innings));
    this.route.navigate(['/result']);
  }

  playAgain() {
    this.route.navigate(['/']);
  }

  allMatches() {
    this.route.navigate(['/matches']);
  }

  calculateTotalRuns(runs: Run[]): number {
    return calculateTotalRuns(runs);
  }

  determineMatchWinner(innings: Inning[]): string {
    return determineMatchWinner(innings);
  }
}
