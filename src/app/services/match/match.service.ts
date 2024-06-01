import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../../interfaces/match.interface';
import { MatchDetails } from '../../interfaces/matchDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  baseUrl = 'https://cricket-simulation-server.onrender.com';

  constructor(private http: HttpClient) {}

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/matches`);
  }

  getMatchDetails(matchId: string): Observable<MatchDetails> {
    return this.http.get<MatchDetails>(`${this.baseUrl}/matches/${matchId}`);
  }

  postMatchData(matchData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches`, matchData);
  }
}
