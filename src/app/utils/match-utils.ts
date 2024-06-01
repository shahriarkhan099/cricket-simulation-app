import { v4 as uuidv4 } from 'uuid';
import { Run } from '../interfaces/run.interface';
import { Inning } from '../interfaces/inning.interface';

export function generateMatchId(): string {
  return uuidv4();
}

export function calculateTotalRuns(runs: Run[]): number {
  return runs.reduce((total, run) => total + run.run, 0);
}

export function determineMatchWinner(innings: Inning[]): string {
  const team1TotalRuns = calculateTotalRuns(innings[0].runs);
  const team2TotalRuns = calculateTotalRuns(innings[1].runs);

  if (team1TotalRuns > team2TotalRuns) {
    return innings[0].team.name;
  } else if (team1TotalRuns < team2TotalRuns) {
    return innings[1].team.name;
  } else {
    return "It's a tie!";
  }
}

export function randomRun() {
  const availableRuns = [1, 2, 3, 4, 6];
  const randomIndex = Math.floor(Math.random() * availableRuns.length);
  return availableRuns[randomIndex];
}
