export interface LearningProfileOnboardingStatusInput {
  onboarding_completed?: boolean | null;
  active_areas?: string[] | null;
}

export function hasActiveAreas(activeAreas?: string[] | null) {
  return (activeAreas ?? []).some((area) => area.trim().length > 0);
}

export function isLearningProfileOnboardingComplete(
  learningProfile?: LearningProfileOnboardingStatusInput | null,
) {
  return Boolean(learningProfile?.onboarding_completed) && hasActiveAreas(learningProfile?.active_areas);
}
