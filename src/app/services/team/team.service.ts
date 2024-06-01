import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../../interfaces/team.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  baseUrl = 'https://cricket-simulation-server.onrender.com';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams`);
  }

  getTeamDetails(teamId: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${teamId}`);
  }
}
