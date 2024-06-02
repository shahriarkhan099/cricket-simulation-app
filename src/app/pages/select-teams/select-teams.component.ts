import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Team } from '../../interfaces/team.interface';
import { TeamService } from '../../services/team/team.service';

@Component({
  selector: 'app-select-teams',
  templateUrl: './select-teams.component.html',
  styleUrl: './select-teams.component.css',
})
export class SelectTeamsComponent {
  teams: Team[] = [];
  chosenTeams: Team[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching teams', error);
        this.isLoading = false;
      },
    });
  }

  handleTeamSelection(team: Team, event: MatCheckboxChange): void {
    const selectionStatus = event.checked;
    if (selectionStatus && this.chosenTeams.length < 2) {
      this.chosenTeams.push(team);
    } else if (!selectionStatus) {
      this.chosenTeams = this.chosenTeams.filter(
        (chosenTeams) => chosenTeams.id !== team.id
      );
    }
  }

  teamSelectionLimitReached(team: Team): boolean {
    if (this.chosenTeams.length !== 2) {
      return false;
    }
    return !this.chosenTeams.find((chosenTeams) => chosenTeams.id === team.id);
  }

  selectBowlingTeam() {
    if (this.chosenTeams.length === 2) {
      localStorage.setItem('team1', JSON.stringify(this.chosenTeams[0]));
      localStorage.setItem('team2', JSON.stringify(this.chosenTeams[1]));
      this.router.navigate(['/toss']);
    }
  }
}
