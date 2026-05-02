interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md";
}

export function LoadingState({ message = "Cargando...", size = "md" }: LoadingStateProps) {
  const barCount = size === "sm" ? 2 : 3;
  return (
    <div className="loading-state" role="status" aria-label={message}>
      <div className="loading-bars">
        {Array.from({ length: barCount }).map((_, i) => (
          <div key={i} className="loading-bar" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <p className="subtle" style={{ margin: "10px 0 0", fontSize: "0.875rem" }}>{message}</p>
    </div>
  );
}
