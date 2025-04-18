import { FetchOptionsProps } from "./types/types";

export const createRequest = async (
  url: string,
  options: FetchOptionsProps
) => {
  return await fetch(import.meta.env.VITE_BACKEND_MAIN_URL + url, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    ...options,
  });
};
