import type { SessionState } from "@/types/session";

export interface NextStateInput {
  currentState: SessionState;
  onboardingCompleted: boolean;
  hasBaseline: boolean;
  remediationNeeded: boolean;
  shouldReview: boolean;
  isSessionEnding: boolean;
  isExpired: boolean;
  hasError: boolean;
}

export function getNextState(input: NextStateInput): SessionState {
  if (input.hasError) return "error";
  if (input.isExpired) return "expired";
  if (!input.onboardingCompleted) return "onboarding";
  if (input.isSessionEnding) return "session_close";

  switch (input.currentState) {
    case "onboarding":
      return input.hasBaseline ? "practice" : "diagnostic";
    case "diagnostic":
      return input.hasBaseline ? "practice" : "diagnostic";
    case "practice":
      if (input.remediationNeeded) return "remediation";
      if (input.shouldReview) return "review";
      return "practice";
    case "remediation":
      return input.remediationNeeded ? "remediation" : "practice";
    case "review":
      return input.isSessionEnding ? "session_close" : "practice";
    case "session_close":
    case "expired":
    case "error":
      return input.currentState;
    default:
      return input.hasBaseline ? "practice" : "diagnostic";
  }
}
