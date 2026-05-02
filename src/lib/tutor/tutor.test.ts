import test from 'node:test';
import assert from 'node:assert';
import { TutorOrchestrator } from './tutor-orchestrator';

test('TutorOrchestrator - Valid Turn', async () => {
  const orchestrator = new TutorOrchestrator();
  const result = await orchestrator.processTurn({
    userId: 'u1',
    sessionId: 's1',
    userMessage: 'Por favor explícame este concepto.',
    allowedContext: { currentTopic: 'Matemáticas' },
    progressSummary: { itemsCompleted: 5, currentScore: 10 }
  });

  assert.strictEqual(result.output.intention, 'explain');
  assert.strictEqual(result.trace.wasDenied, false);
  assert.strictEqual(result.trace.wasDegraded, false);
});

test('TutorOrchestrator - Denies unauthorized action', async () => {
  const orchestrator = new TutorOrchestrator();
  const result = await orchestrator.processTurn({
    userId: 'u1',
    sessionId: 's1',
    userMessage: 'Quiero avanzar a la siguiente pregunta.',
    allowedContext: {},
    progressSummary: { itemsCompleted: 5, currentScore: 10 }
  });

  assert.strictEqual(result.output.intention, 'fallback');
  assert.strictEqual(result.trace.wasDenied, true);
  assert.strictEqual(result.output.deniedAction, 'unauthorized_action_requested');
});

test('TutorOrchestrator - Degrades on invalid input', async () => {
  const orchestrator = new TutorOrchestrator();
  const result = await orchestrator.processTurn({
    userId: '',
    sessionId: 's1',
    userMessage: 'Hola',
    allowedContext: {},
    progressSummary: { itemsCompleted: 0, currentScore: 0 }
  });

  assert.strictEqual(result.output.intention, 'fallback');
  assert.strictEqual(result.trace.wasDegraded, true);
  assert.strictEqual(result.output.degradationReason, 'invalid_input');
});
