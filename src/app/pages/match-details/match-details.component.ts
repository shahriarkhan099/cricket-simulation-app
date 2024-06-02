import { Inning } from '../../interfaces/inning.interface';
import { MatchService } from '../../services/match/match.service';
import { determineMatchWinner } from '../../utils/match-utils';
import { MatchData } from '../../interfaces/matchData.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.css',
})
export class MatchDetailsComponent implements OnInit {
  matchId!: string;
  matchData!: MatchData;
  matchInnings: Inning[] = [];
  tableColumns: string[] = ['ball', 'run'];
  isLoadingOn: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('matchId');
      this.matchId = id || '';
      this.getAllMatchHistory();
    });
  }

  getAllMatchHistory() {
    if (this.matchId) {
      this.isLoadingOn = true;
      this.matchService.getMatchDetails(this.matchId).subscribe({
        next: (data: any) => {
          this.matchData = data;
          this.matchInnings = data.innings;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
        complete: () => {
          this.isLoadingOn = false;
        },
      });
    }
  }

  calculateMatchWinner(): string | undefined {
    if (!this.matchData || !this.matchData.innings) {
      return undefined;
    }
    return determineMatchWinner(this.matchData.innings);
  }
}
