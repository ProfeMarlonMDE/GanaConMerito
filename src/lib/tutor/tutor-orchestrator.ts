import { TutorInput, TutorOutput, TutorTrace } from '../../types/tutor-turn';
import { TUTOR_CONTRACT_VERSION, enforceGuardrails, validateInput } from '../../domain/tutor/contract';

export class TutorOrchestrator {
  
  public async processTurn(input: TutorInput): Promise<{ output: TutorOutput; trace: TutorTrace }> {
    const traceId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    if (!validateInput(input)) {
      return this.createDegradedTurn(input, 'invalid_input', traceId, timestamp);
    }

    const intentRequiresAuthority = this.detectUnauthorizedIntent(input.userMessage);
    if (intentRequiresAuthority) {
      return this.createDeniedTurn(input, 'unauthorized_action_requested', traceId, timestamp);
    }

    const output: TutorOutput = {
      intention: 'explain',
      visibleMessage: `Entendido. Te explico sobre el tema actual: ${input.allowedContext.currentTopic || 'general'}.`,
      uncertaintyFlags: false,
      structuredMetadata: {
        processedAt: timestamp,
        contractVersion: TUTOR_CONTRACT_VERSION
      }
    };

    const trace: TutorTrace = {
      traceId,
      timestamp,
      input,
      output,
      appliedGuardrails: ['validate_input', 'enforce_authority'],
      wasDenied: false,
      wasDegraded: false
    };

    return { output, trace };
  }

  private detectUnauthorizedIntent(message: string): boolean {
    const msg = message.toLowerCase();
    return msg.includes('calificar') || msg.includes('avanzar') || msg.includes('cerrar sesión') || msg.includes('puntaje');
  }

  private createDegradedTurn(input: TutorInput, reason: string, traceId: string, timestamp: string) {
    const output: TutorOutput = {
      intention: 'fallback',
      visibleMessage: 'No puedo procesar la solicitud con la información proporcionada.',
      uncertaintyFlags: true,
      degradationReason: reason,
      structuredMetadata: {
        processedAt: timestamp,
        contractVersion: TUTOR_CONTRACT_VERSION
      }
    };
    const trace: TutorTrace = {
      traceId,
      timestamp,
      input,
      output,
      appliedGuardrails: ['validate_input'],
      wasDenied: false,
      wasDegraded: true
    };
    return { output, trace };
  }

  private createDeniedTurn(input: TutorInput, reason: string, traceId: string, timestamp: string) {
    const output: TutorOutput = {
      intention: 'fallback',
      visibleMessage: 'No tengo autorización para realizar esta acción sobre tu sesión.',
      uncertaintyFlags: false,
      deniedAction: reason,
      structuredMetadata: {
        processedAt: timestamp,
        contractVersion: TUTOR_CONTRACT_VERSION
      }
    };
    const trace: TutorTrace = {
      traceId,
      timestamp,
      input,
      output,
      appliedGuardrails: ['enforce_authority'],
      wasDenied: true,
      wasDegraded: false
    };
    return { output, trace };
  }
}
