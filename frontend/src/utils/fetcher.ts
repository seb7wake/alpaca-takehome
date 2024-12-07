export const fetcher = (route: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}`).then((res) =>
    res.json()
  );

export const postFetcher = (
  route: string,
  data: any,
  method: "POST" | "PUT" = "POST"
) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
