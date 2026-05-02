interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p className="section-title" style={{ margin: "0 0 6px", fontSize: "1.05rem" }}>{title}</p>
      {description ? <p className="subtle" style={{ margin: "0 0 16px" }}>{description}</p> : null}
      {action ?? null}
    </div>
  );
}
