"use client";

import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL?.replace(/\/$/, "");

export function useCmsData<T>(path: string, fallback: T): T {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    if (!baseUrl) return;
    let active = true;
    fetch(`${baseUrl}${path}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: T | null) => { if (active && payload) setData(payload); })
      .catch(() => undefined);
    return () => { active = false; };
  }, [path]);

  return data;
}
