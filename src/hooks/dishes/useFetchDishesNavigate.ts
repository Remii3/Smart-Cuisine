import { useState } from "react";
import { useQuery } from "react-query";

const fetchDishes = async ({ extraQuery }: { extraQuery: string }) => {
  const url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY}&number=2${extraQuery}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const useFetchDishesNavigate = ({
  extraQuery,
  fetchname,
}: {
  extraQuery: string;
  fetchname: string;
}) => {
  const {
    data: dishesData,
    isLoading: dishesLoading,
    error: dishesError,
  } = useQuery([fetchname], () => fetchDishes({ extraQuery }), {
    keepPreviousData: true,
  });

  return {
    dishesData,
    dishesLoading,
    dishesError,
  };
};

export default useFetchDishesNavigate;
