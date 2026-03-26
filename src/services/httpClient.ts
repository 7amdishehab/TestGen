export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function request<TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit & { method?: HttpMethod },
): Promise<TResponse> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return (await res.json()) as TResponse;
}
