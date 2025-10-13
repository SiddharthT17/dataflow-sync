import { useEffect, useState } from "react";

/**
 * Generic async hook to fetch mock data and handle loading/errors.
 */
export const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFn()
      .then((res) => mounted && setData(res.data))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, deps);

  return { data, loading, error };
};
