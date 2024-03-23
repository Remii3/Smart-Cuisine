import { useState } from "react";
import { useQuery } from "react-query";

const fetchDishes = async ({
  page,
  extraQuery,
}: {
  page: number;
  extraQuery: string;
}) => {
  const offset = page * 2;
  const url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY}&number=2&offset=${offset}${extraQuery}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const useFetchDishesPagination = ({ extraQuery }: { extraQuery: string }) => {
  const [page, setPage] = useState(0);

  const {
    data: dishesData,
    isLoading: dishesLoading,
    error: dishesError,
  } = useQuery(["dishes", page], () => fetchDishes({ page, extraQuery }), {
    keepPreviousData: true,
  });

  const onNextPage = () => {
    setPage((prev) => prev + 2);
  };
  const onPrevPage = () => {
    setPage((prev) => prev - 2);
  };
  return {
    dishesData,
    dishesLoading,
    dishesError,
    onNextPage,
    onPrevPage,
    page,
  };
};

export default useFetchDishesPagination;
