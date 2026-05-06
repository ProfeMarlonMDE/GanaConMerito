import assert from "node:assert/strict";
import test from "node:test";
import { TUTOR_CONTRACT_VERSION } from "../../domain/tutor/contract";
import { buildTutorTraceSummary } from "./tutor-trace-summary";

test("buildTutorTraceSummary aggregates metrics and top lists", () => {
  const summary = buildTutorTraceSummary([
    {
      created_at: "2026-05-01T12:00:00.000Z",
      mode: "practice",
      intent: "hint",
      degraded: false,
      can_reveal_correct_answer: false,
      guardrails_applied: ["no_direct_answer"],
    },
    {
      created_at: "2026-05-02T12:00:00.000Z",
      mode: "practice",
      intent: "explain",
      degraded: true,
      can_reveal_correct_answer: true,
      guardrails_applied: ["tone"],
    },
    {
      created_at: "2026-05-03T12:00:00.000Z",
      mode: "practice",
      intent: "hint",
      degraded: false,
      can_reveal_correct_answer: false,
      guardrails_applied: ["no_direct_answer", "tone"],
    },
  ]);

  assert.equal(summary.totalTurns, 3);
  assert.equal(summary.degradedTurns, 1);
  assert.equal(summary.preAnswerGuardrailHits, 2);
  assert.equal(summary.postAnswerExplanations, 1);
  assert.deepEqual(summary.topIntents, [
    { intent: "hint", count: 2 },
    { intent: "explain", count: 1 },
  ]);
  assert.deepEqual(summary.topGuardrails, [
    { guardrail: "no_direct_answer", count: 2 },
    { guardrail: "tone", count: 2 },
  ]);
  assert.equal(summary.recentTurns[0]?.createdAt, "2026-05-03T12:00:00.000Z");
});

test("buildTutorTraceSummary ignores metadata tags inside guardrails_applied", () => {
  const summary = buildTutorTraceSummary([
    {
      created_at: "2026-05-04T12:00:00.000Z",
      mode: "practice",
      intent: "hint",
      degraded: false,
      can_reveal_correct_answer: false,
      guardrails_applied: [TUTOR_CONTRACT_VERSION, "no_free_chat", "non_guardrail_metadata"],
    },
  ]);

  assert.deepEqual(summary.topGuardrails, [{ guardrail: "no_free_chat", count: 1 }]);
});

test("buildTutorTraceSummary returns zeros for empty input", () => {
  assert.deepEqual(buildTutorTraceSummary([]), {
    totalTurns: 0,
    degradedTurns: 0,
    preAnswerGuardrailHits: 0,
    postAnswerExplanations: 0,
    topIntents: [],
    topGuardrails: [],
    recentTurns: [],
  });
});
