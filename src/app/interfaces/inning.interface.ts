import { Run } from "./run.interface";
import { Team } from "./team.interface";

export interface Inning {
  team: Team;
  runs: Run[];
  totalRuns: number;
}
