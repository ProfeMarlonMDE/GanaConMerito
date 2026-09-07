import { CANONICAL_POSITIONS, getPositionDisplay } from "@/lib/domain/positions";

interface PositionSelectorProps {
  value: string; // targetProfileCode
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PositionSelector({ value, onChange, disabled }: PositionSelectorProps) {
  return (
    <div className="gcm-profile-select-wrapper">
      <div className="gcm-profile-select-icon">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
        </svg>
      </div>
      <select
        className="gcm-profile-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>Selecciona un cargo...</option>
        {CANONICAL_POSITIONS.map((pos) => (
          <option key={pos.id} value={pos.id}>
            {getPositionDisplay(pos)}
          </option>
        ))}
      </select>
    </div>
  );
}
