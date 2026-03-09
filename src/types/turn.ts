import type { OptionKey } from "./content";

export interface SessionTurnInput {
  sessionId: string;
  itemId: string;
  turnNumber: number;
  selectedOption?: OptionKey;
  userRationale?: string;
  responseTimeMs?: number;
  confidenceSelfReport?: 1 | 2 | 3 | 4 | 5;
}
