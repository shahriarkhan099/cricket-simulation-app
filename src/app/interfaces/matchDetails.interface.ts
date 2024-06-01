import { Inning } from "./inning.interface";
import { Match } from "./match.interface";

export interface MatchDetails extends Match {
  innings: Inning[];
}
