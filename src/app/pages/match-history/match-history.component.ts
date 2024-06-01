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
  displayedColumns: string[] = [
    'team1',
    'team2',
    'tossWinner',
    'matchWinner',
    'actions',
  ];
  dataSource = new MatTableDataSource<Match>([]);
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matchService: MatchService, private route: Router) {}

  fetchMatches() {
    this.isLoading = true;
    this.matchService.getMatches().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Match>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    this.fetchMatches();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewMatchDetails(id: string) {
    this.route.navigate([`/match/details/${id}`]);
  }

  deleteMatch(id: string) {
    if (confirm('Are you sure you want to delete this match?')) {
      this.dataSource.data = this.dataSource.data.filter(
        (match) => match.id !== id
      );
    }
  }
}
