import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { getTutorGuidedActions } from "../src/components/tutor/tutor-interface";

test("Tutor panel layout distribution matches approved order", () => {
  const tutorFile = fs.readFileSync("src/components/tutor/tutor-interface.tsx", "utf8");

  // Step 1: Compact header
  const headerIdx = tutorFile.indexOf('className="tutor-header"');
  assert.ok(headerIdx !== -1, "Header exists");

  // Step 2: Compact dropdown selector of style
  const profileSelectorIdx = tutorFile.indexOf('className="tutor-profile-selector"');
  assert.ok(profileSelectorIdx > headerIdx, "Profile selector is after header");

  // Step 3: Brief description of style
  const styleDescIdx = tutorFile.indexOf('className="active-profile-banner"');
  assert.ok(styleDescIdx > profileSelectorIdx, "Active profile banner is after profile selector");

  // Step 4: Existing initial message card
  const initialCardIdx = tutorFile.indexOf('className="tutor-initial-card"');
  assert.ok(initialCardIdx > styleDescIdx, "Initial card is after active profile banner");

  // Step 5: Integrated query input and send button
  const inputFormIdx = tutorFile.indexOf('className="tutor-input-form"');
  assert.ok(inputFormIdx > initialCardIdx, "Input form is after initial card");

  // Step 6: Suggested question chips
  const suggestionsIdx = tutorFile.indexOf('className="tutor-guided-suggestions"');
  assert.ok(suggestionsIdx > inputFormIdx, "Suggested chips are after input form");

  // Step 7: Conversation thread growing below
  const conversationIdx = tutorFile.indexOf('className="tutor-conversation-container"');
  assert.ok(conversationIdx > suggestionsIdx, "Conversation container is after suggestions");
});

test("Chip lifecycle: getTutorGuidedActions contract", () => {
  // Pre-answer guided: 3 tactical reasoning suggestions
  const preGuided = getTutorGuidedActions(false, "guided");
  assert.equal(preGuided.length, 3);
  assert.deepEqual(preGuided, [
    "¿Cuál es mi rol y competencia aquí?",
    "¿Cuál es la tarea evaluativa real?",
    "¿Qué trampa esconden los distractores?",
  ]);

  // Post-answer: 0 suggestions (all hidden)
  const postGuided = getTutorGuidedActions(true, "guided");
  assert.equal(postGuided.length, 0);

  // Simulation mode before answer: 0 suggestions
  const preSimulation = getTutorGuidedActions(false, "simulation");
  assert.equal(preSimulation.length, 0);

  // Review mode before answer: 3 suggestions
  const preReview = getTutorGuidedActions(false, "review");
  assert.equal(preReview.length, 3);
});

test("Profile options and initials: only S, D, B and no 'Balanceado'", () => {
  const tutorFile = fs.readFileSync("src/components/tutor/tutor-interface.tsx", "utf8");

  // Socrático, Directo, Breve present
  assert.match(tutorFile, /socratic/);
  assert.match(tutorFile, /direct/);
  assert.match(tutorFile, /brief/);

  // No 'balanced' or 'Balanceado'
  assert.doesNotMatch(tutorFile, /balanced/i);
  assert.doesNotMatch(tutorFile, /Balanceado/i);

  // Initials S, D, B
  assert.match(tutorFile, /initial:\s*"S"/);
  assert.match(tutorFile, /initial:\s*"D"/);
  assert.match(tutorFile, /initial:\s*"B"/);
});

test("Conversation thread does not duplicate initial greeting", () => {
  const tutorFile = fs.readFileSync("src/components/tutor/tutor-interface.tsx", "utf8");
  assert.match(tutorFile, /const conversationMessages = messages\.filter\(\(m\) => !isInitialTutorGreeting\(m\.text\)\);/);
});

test("CSS rules ensure compact, non-nested, accessible panel", () => {
  const cssFile = fs.readFileSync("src/app/globals.css", "utf8");

  // Unified input container
  assert.match(cssFile, /\.tutor-input-container/);
  assert.match(cssFile, /\.tutor-unified-input/);
  assert.match(cssFile, /\.tutor-integrated-submit-btn/);

  // Profile dropdown menu
  assert.match(cssFile, /\.tutor-profile-dropdown-menu/);
  assert.match(cssFile, /\.tutor-profile-trigger-card/);

  // Suggested chips
  assert.match(cssFile, /\.tutor-suggestion-chip/);
  assert.match(cssFile, /\.tutor-chip-arrow/);

  // Conversation thread
  assert.match(cssFile, /\.tutor-conversation-container/);
  assert.match(cssFile, /\.tutor-chat-row/);
  assert.match(cssFile, /\.tutor-user-bubble/);
  assert.match(cssFile, /\.tutor-assistant-card/);
});
