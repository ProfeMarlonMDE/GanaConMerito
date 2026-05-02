import { TutorInput, TutorOutput } from '../../types/tutor-turn';

export const TUTOR_CONTRACT_VERSION = 'v1.0.0';

export const TUTOR_AUTHORITY_RULES = {
  CAN_EXPLAIN: true,
  CAN_ORIENT: true,
  CAN_SUGGEST: true,
  CAN_SCORE: false,
  CAN_ADVANCE_SESSION: false,
  CAN_CLOSE_SESSION: false,
};

export function validateInput(input: TutorInput): boolean {
  if (!input.userId || !input.sessionId || !input.userMessage) return false;
  return true;
}

export function enforceGuardrails(requestedAction: string): boolean {
  const unauthorizedActions = ['score', 'advance', 'close_session'];
  if (unauthorizedActions.includes(requestedAction.toLowerCase())) {
    return false;
  }
  return true;
}
