"use client";

import { useEffect, useState } from "react";

export function useCmsData<T>(path: string, fallback: T): T {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let active = true;
    fetch(`/api/cms${path}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: T | null) => { if (active && payload) setData(payload); })
      .catch(() => undefined);
    return () => { active = false; };
  }, [path]);

  return data;
}
