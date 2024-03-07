import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { useQuery } from "react-query";
import DishCard from "../components/DishCard";
import { colors } from "../../constants/colors";

type Props = DrawerScreenProps<RootDrawerParamList, "Search">;

async function fetchDishes({ prompt }: { prompt: string }) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY}&includeIngredients=${prompt}`;
  const res = await fetch(url);
  return await res.json();
}

export default function SearchScreen({ route }: Props) {
  const prompt = route.params.prompt;
  const { data, error, isError, isLoading } = useQuery("dishes", () =>
    fetchDishes({ prompt })
  );
  if (isLoading) return <Text>Loading...</Text>;
  if (isError && error instanceof Error)
    return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Text>Results: </Text>
      <ScrollView style={styles.container}>
        {data.results.map((dish: DishCardType) => (
          <DishCard
            key={dish.id}
            id={dish.id}
            image={dish.image}
            imageType={dish.imageType}
            title={dish.title}
          />
        ))}
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
