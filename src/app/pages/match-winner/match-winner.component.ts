import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../services/match/match.service';
import { Team } from '../../interfaces/team.interface';
import { Inning } from '../../interfaces/inning.interface';
import { determineMatchWinner, randomRun } from '../../utils/match-utils';

@Component({
  selector: 'app-match-winner',
  templateUrl: './match-winner.component.html',
  styleUrls: ['./match-winner.component.css'],
})
export class MatchWinnerComponent implements OnInit {
  team1!: Team;
  team2!: Team;
  tossWinner!: Team;
  innings: Inning[] = [];
  balls: number = 6;
  play: boolean = false;
  winner?: string;
  id!: string | null;
  tableColumns: string[] = ['ball', 'run'];
  tossDecision!: string;

  constructor(
    private router: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.initializeTeams();
    this.initializeToss();
  }

  initializeTeams() {
    const team1String = localStorage.getItem('team1');
    const team2String = localStorage.getItem('team2');
    if (team1String && team2String) {
      this.team1 = JSON.parse(team1String);
      this.team2 = JSON.parse(team2String);
    }
  }

  initializeToss() {
    const tossWinnerString = localStorage.getItem('tossWinner');
    const selectedTossDecisionString = localStorage.getItem('tossSelection');
    if (tossWinnerString && selectedTossDecisionString) {
      this.tossWinner = JSON.parse(tossWinnerString);
      this.tossDecision =
        this.tossWinner.name === selectedTossDecisionString ? 'bowl' : 'bat';
    }
    this.innings.push({ team: this.tossWinner, runs: [], totalRuns: 0 });
  }

  cricketSimulation() {
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

    this.winner = this.calculateMatchWinner(this.innings);
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

  calculateMatchWinner(innings: Inning[]): string {
    return determineMatchWinner(innings);
  }
}
