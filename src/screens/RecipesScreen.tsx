import { DrawerScreenProps } from "@react-navigation/drawer";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootDrawerParamList } from "../../Router";
import { useQuery } from "react-query";
import DishCard from "../components/DishCard";
import { useState } from "react";
import ScreenError from "../components/UI/ScreenError";
import ScreenLoader from "../components/UI/ScreenLoader";

type Props = DrawerScreenProps<RootDrawerParamList>;

const fetchDishes = async (page: number) => {
  const offset = page * 2;
  const url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY}&minCarbs=10&maxCarbs=50&number=2&offset=${offset}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default function RecipesScreen({ navigation }: Props) {
  const [page, setPage] = useState(0);

  const {
    data: dishesData,
    isLoading: dishesLoading,
    error: dishesError,
  } = useQuery(["dishes", page], () => fetchDishes(page), {
    keepPreviousData: true,
  });

  const onNextPage = () => {
    setPage((prev) => prev + 2);
  };
  const onPrevPage = () => {
    setPage((prev) => prev - 2);
  };

  if (dishesLoading) {
    return <ScreenLoader />;
  }

  if (dishesError instanceof Error) {
    return <ScreenError message={dishesError.message} />;
  }

  return (
    <View style={styles.container}>
      <Text>Recipes</Text>
      <ScrollView>
        {dishesData && dishesData.length > 0 ? (
          dishesData.map((dish: DishCardType) => (
            <DishCard
              id={dish.id}
              image={dish.image}
              imageType={dish.imageType}
              title={dish.title}
              key={dish.id}
            />
          ))
        ) : (
          <Text>No results</Text>
        )}
      </ScrollView>
      <Button title="Next" onPress={onNextPage} />
      <Button title="Prev" disabled={page == 0} onPress={onPrevPage} />
      <Button
        title="Go to Recipe"
        onPress={() => navigation.navigate("Recipe", { productId: "#" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
