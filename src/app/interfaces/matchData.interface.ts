import { Inning } from './inning.interface';
import { Team } from './team.interface';

export interface MatchData {
  id: string | null;
  team1: Team;
  team2: Team;
  tossWinner: Team;
  innings: Inning[];
  matchWinner: string;
}
