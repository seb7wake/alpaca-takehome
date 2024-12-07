export const fetcher = (route: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}`).then((res) =>
    res.json()
  );

export const postFetcher = (route: string, data: any) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
