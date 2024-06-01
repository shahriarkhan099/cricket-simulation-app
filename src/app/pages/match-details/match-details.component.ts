import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchDetails } from '../../interfaces/matchDetails.interface';
import { Inning } from '../../interfaces/inning.interface';
import { MatchService } from '../../services/match/match.service';
import { determineMatchWinner } from '../../utils/match-utils';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.css',
})
export class MatchDetailsComponent implements OnInit {
  matchId: string = '';
  matchData: any | undefined;
  matchInnings: Inning[] = [];
  displayedColumns: string[] = ['ball', 'run'];

  constructor(
    private router: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('matchId');
      this.matchId = id || '';
      this.fetchMatchDetails();
    });
  }

  fetchMatchDetails() {
    if (this.matchId) {
      this.matchService.getMatchDetails(this.matchId).subscribe({
        next: (data: MatchDetails) => {
          this.matchData = data;
          this.matchInnings = data.innings;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
    }
  }

  getWinner(): string | undefined {
    if (!this.matchData || !this.matchData.innings) {
      return undefined;
    }
    return determineMatchWinner(this.matchData.innings);
  }
}