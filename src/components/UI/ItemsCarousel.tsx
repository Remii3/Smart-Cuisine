import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DishCard from "../DishCard";
import ScreenLoader from "./ScreenLoader";
import ScreenError from "./ScreenError";
import { colors } from "../../../constants/colors";

const ItemsCarousel = ({
  dataList,
  isLoading,
  error,
}: {
  dataList: any[];
  isLoading: boolean;
  error: unknown;
}) => {
  if (isLoading) {
    return <ScreenLoader />;
  }

  if (error instanceof Error) {
    return <ScreenError message={error.message} />;
  }

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.dishesContainer}
    >
      {dataList && dataList.length > 0 ? (
        dataList.map((dish: DishCardType) => (
          <DishCard
            id={dish.id}
            image={dish.image}
            imageType={dish.imageType}
            title={dish.title}
            key={dish.id}
            direction="horizontal"
          />
        ))
      ) : (
        <Text style={styles.noResults}>No results</Text>
      )}
    </ScrollView>
  );
};

export default ItemsCarousel;

const styles = StyleSheet.create({
  dishesContainer: {
    flexDirection: "row",
    maxHeight: 300,
    marginLeft: -10,
    marginRight: -10,
  },
  noResults: {
    marginLeft: 10,
    color: colors.dark,
  },
});
