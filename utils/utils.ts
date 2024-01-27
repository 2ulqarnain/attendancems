export const fetchData = async (
  url: string | undefined,
  options?: RequestInit,
) => url && fetch(url, options).then((res) => res.json());