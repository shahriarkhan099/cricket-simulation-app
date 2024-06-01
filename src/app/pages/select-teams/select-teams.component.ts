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
  selectedTeams: Team[] = [];

  constructor(private router: Router, private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(
      (data: Team[]) => {
        this.teams = data;
      },
      (error) => {
        console.error('Error fetching teams', error);
      }
    );
  }

  onTeamSelect(team: Team, event: MatCheckboxChange) {
    const isChecked = event.checked;
    if (isChecked) {
      if (this.selectedTeams.length < 2) {
        this.selectedTeams.push(team);
      }
    } else {
      this.selectedTeams = this.selectedTeams.filter((t) => t.id !== team.id);
    }
  }

  isTeamDisabled(team: Team): boolean {
    return (
      this.selectedTeams.length === 2 &&
      !this.selectedTeams.some((t) => t.id === team.id)
    );
  }

  proceedToToss() {
    if (this.selectedTeams.length === 2) {
      localStorage.setItem('team1', JSON.stringify(this.selectedTeams[0]));
      localStorage.setItem('team2', JSON.stringify(this.selectedTeams[1]));
      this.router.navigate(['/toss']);
    }
  }
}
