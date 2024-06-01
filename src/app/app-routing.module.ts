import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectTeamsComponent } from './pages/select-teams/select-teams.component';
import { MatchWinnerComponent } from './pages/match-winner/match-winner.component';
import { MatchHistoryComponent } from './pages/match-history/match-history.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { FlipTossComponent } from './pages/flip-toss/flip-toss.component';

const routes: Routes = [
  { path: '', component: SelectTeamsComponent },
  { path: 'toss', component: FlipTossComponent },
  { path: 'play/:id', component: MatchWinnerComponent },
  { path: 'matches', component: MatchHistoryComponent },
  { path: 'match/details/:matchId', component: MatchDetailsComponent },
  { path: 'home', component: SelectTeamsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
