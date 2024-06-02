import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Match } from '../../interfaces/match.interface';
import { MatchService } from '../../services/match/match.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.css',
})
export class MatchHistoryComponent implements OnInit {
  matchHistoryTableColumn: string[] = [
    'team1',
    'team2',
    'tossWinner',
    'matchWinner',
    'actions',
  ];
  matchDataList = new MatTableDataSource<Match>([]);
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matchService: MatchService, private route: Router) {}

  ngOnInit() {
    this.getAllMatchData();
    this.matchDataList.paginator = this.paginator;
    this.matchDataList.sort = this.sort;
  }

  getAllMatchData() {
    this.isLoading = true;
    this.matchService.getMatches().subscribe({
      next: (data) => {
        this.matchDataList = new MatTableDataSource<Match>(data);
        this.matchDataList.paginator = this.paginator;
        this.matchDataList.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  deleteMatch(id: string) {
    if (confirm('Are you sure you want to delete this match?')) {
      this.matchDataList.data = this.matchDataList.data.filter(
        (match) => match.id !== id
      );
    }
  }

  viewMatchDetails(id: string) {
    this.route.navigate([`/match/details/${id}`]);
  }
}
