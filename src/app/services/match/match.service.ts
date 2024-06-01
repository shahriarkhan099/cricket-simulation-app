import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../../interfaces/match.interface';
import { MatchDetails } from '../../interfaces/matchDetails.interface';
import { environment } from '../../../environments/environment.prod';
import { MatchData } from '../../interfaces/matchData.interface';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/matches`);
  }

  getMatchDetails(matchId: string): Observable<MatchDetails> {
    return this.http.get<MatchDetails>(`${this.baseUrl}/matches/${matchId}`);
  }

  postMatchData(matchData: MatchData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/matches`, matchData);
  }
}
