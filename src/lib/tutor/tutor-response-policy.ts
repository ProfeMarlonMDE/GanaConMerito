import type { RationaleQuality, TutorIntent, TutorMode } from "../../types/tutor-turn";

const CURRENT_QUESTION_PATTERNS = [
  "pregunta",
  "opcion",
  "opción",
  "respuesta",
  "pista",
  "distractor",
  "justificacion",
  "justificación",
  "retroalimentacion",
  "retroalimentación",
  "feedback",
];

export function detectTutorMode(message: string): TutorMode {
  const normalized = normalize(message);
  if (["desempeño", "rendimiento", "practicar", "siguiente", "debo estudiar"].some((term) => normalized.includes(term))) {
    return "performance_analysis";
  }
  if (["concurso", "perfil", "empleo", "convocatoria", "regla", "acuerdo"].some((term) => normalized.includes(term))) {
    return "contest_preparation";
  }
  if (CURRENT_QUESTION_PATTERNS.some((term) => normalized.includes(term))) {
    return "current_question";
  }
  return "current_question";
}

export function detectTutorIntent(message: string): TutorIntent {
  const normalized = normalize(message);
  if (["respuesta correcta", "correcta", "cuál es", "cual es"].some((term) => normalized.includes(term))) return "explain_question";
  if (["pista", "ayuda"].some((term) => normalized.includes(term))) return "give_hint";
  if (["compara", "comparar", "diferencia", "opciones"].some((term) => normalized.includes(term))) return "compare_options";
  if (["concepto", "tema", "significa"].some((term) => normalized.includes(term))) return "clarify_concept";
  if (["qué me piden", "que me piden", "tarea", "espera"].some((term) => normalized.includes(term))) return "explain_expected_task";
  if (["justificación", "justificacion", "mi argumento"].some((term) => normalized.includes(term))) return "analyze_user_rationale";
  if (["feedback", "retroalimentación", "retroalimentacion"].some((term) => normalized.includes(term))) return "explain_feedback";
  if (["siguiente práctica", "siguiente practica", "qué practico", "que practico"].some((term) => normalized.includes(term))) return "recommend_next_practice";
  if (["perfil", "empleo", "cargo"].some((term) => normalized.includes(term))) return "explain_profile_alignment";
  if (["regla", "concurso", "acuerdo", "guía", "guia"].some((term) => normalized.includes(term))) return "explain_contest_rule";
  return "clarify_concept";
}

export function requestsCorrectAnswer(message: string): boolean {
  const normalized = normalize(message);
  return ["respuesta correcta", "cuál es la correcta", "cual es la correcta", "dime la correcta", "dame la respuesta"].some((term) =>
    normalized.includes(term)
  );
}

export function classifyRationale(rationale?: string): RationaleQuality | undefined {
  const text = rationale?.trim();
  if (!text) return undefined;
  const words = text.split(/\s+/).length;
  const hasBecause = /\bporque\b|\bpor tanto\b|\bdebido\b|\bsegún\b|\bsegun\b/i.test(text);
  const hasContrast = /\bno\b|\bdescarta\b|\bdiferencia\b|\ben cambio\b/i.test(text);
  if (words >= 30 && hasBecause && hasContrast) return "strong";
  if (words >= 12 && hasBecause) return "acceptable";
  return "weak";
}

export function trimToWordLimit(message: string, maxWords: number): string {
  const words = message.trim().split(/\s+/);
  if (words.length <= maxWords) return message.trim();
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function normalize(message: string): string {
  return message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
