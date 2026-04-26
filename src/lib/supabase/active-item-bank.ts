type QueryResult<T> = {
  data: T | null;
  error: {
    code?: string;
    message?: string;
  } | null;
};

type QueryResultLike<T> = PromiseLike<QueryResult<T>>;

type ActiveItemBankSource = "v_item_bank_active" | "item_bank";

function isMissingActiveItemBankView(error: { code?: string; message?: string } | null | undefined) {
  if (!error) {
    return false;
  }

  return error.code === "42P01" || error.message?.includes("v_item_bank_active") === true;
}

export function applyActiveItemBankFilters<TQuery>(query: TQuery, source: ActiveItemBankSource): TQuery {
  if (source === "v_item_bank_active") {
    return (query as any).eq("read_state", "active");
  }

  return (query as any).eq("status", "published").eq("is_active", true);
}

export async function runWithActiveItemBankFallback<T>(
  run: (source: ActiveItemBankSource) => QueryResultLike<T>,
): Promise<QueryResult<T>> {
  const preferred = await run("v_item_bank_active");

  if (!isMissingActiveItemBankView(preferred.error)) {
    return preferred;
  }

  return await run("item_bank");
}
