import { useQuery } from "react-query";

const fetchFavorites = async (userId: string) => {
  const response = await fetch(``);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useFetchFavorites = (userId: string) => {
  return useQuery(["favorites", userId], () => fetchFavorites(userId));
};
