import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { useQuery } from "react-query";
import DishCard from "../components/DishCard";
import ScreenError from "../components/UI/ScreenError";
import ScreenLoader from "../components/UI/ScreenLoader";

type Props = DrawerScreenProps<RootDrawerParamList, "Search">;

async function fetchDishes({ prompt }: { prompt: string }) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY}&includeIngredients=${prompt}`;
  const res = await fetch(url);
  return await res.json();
}

export default function SearchScreen({ route }: Props) {
  const prompt = route.params.prompt;
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useQuery("dishes", () => fetchDishes({ prompt }));

  if (searchLoading) {
    return <ScreenLoader />;
  }

  if (searchError instanceof Error) {
    return <ScreenError message={searchError.message} />;
  }
  return (
    <View>
      <Text>Results: </Text>
      <ScrollView style={styles.container}>
        {searchData && searchData.leangth > 0 ? (
          searchData.results.map((dish: DishCardType) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              image={dish.image}
              imageType={dish.imageType}
              title={dish.title}
            />
          ))
        ) : (
          <Text>No results</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    padding: 20,
  },
});
