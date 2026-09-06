import { CANONICAL_POSITIONS, getPositionDisplay, PositionOption } from "@/lib/domain/positions";

interface PositionSelectorProps {
  value: string; // targetProfileCode
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PositionSelector({ value, onChange, disabled }: PositionSelectorProps) {
  return (
    <div className="gcm-profile-choice-group position-selector-group">
      {CANONICAL_POSITIONS.map((pos) => {
        const isActive = value === pos.id;
        return (
          <button
            key={pos.id}
            type="button"
            className={`gcm-profile-pill ${isActive ? "active" : ""}`}
            onClick={() => onChange(pos.id)}
            disabled={disabled}
            aria-pressed={isActive}
          >
            {getPositionDisplay(pos)}
          </button>
        );
      })}
    </div>
  );
}
