export type TutorIntention = 'explain' | 'orient' | 'suggest' | 'fallback';

export interface TutorInput {
  userId: string;
  sessionId: string;
  userMessage: string;
  allowedContext: {
    currentTopic?: string;
    recentErrors?: string[];
  };
  progressSummary: {
    itemsCompleted: number;
    currentScore: number;
  };
}

export interface TutorOutput {
  intention: TutorIntention;
  visibleMessage: string;
  uncertaintyFlags: boolean;
  suggestedAction?: string;
  deniedAction?: string;
  degradationReason?: string;
  structuredMetadata: {
    processedAt: string;
    contractVersion: string;
  };
}

export interface TutorTrace {
  traceId: string;
  timestamp: string;
  input: TutorInput;
  output: TutorOutput;
  appliedGuardrails: string[];
  wasDenied: boolean;
  wasDegraded: boolean;
}
