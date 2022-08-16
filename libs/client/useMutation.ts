import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type useMutationResult<T> = [
  (data: any) => void,
  UseMutationState<T>
];

export default function useMutation<T = any>(
  url: string
): useMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev: UseMutationState<T>) => ({
      ...prev,
      loading: true,
    }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  }

  return [mutation, state];
}
