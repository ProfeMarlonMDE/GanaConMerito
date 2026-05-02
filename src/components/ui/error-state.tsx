interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="feedback-card error" role="alert">
      <p className="body-sm" style={{ margin: 0 }}>{message}</p>
      {onRetry ? (
        <button onClick={onRetry} className="secondary-button" style={{ marginTop: 12 }}>
          Reintentar
        </button>
      ) : null}
    </div>
  );
}
