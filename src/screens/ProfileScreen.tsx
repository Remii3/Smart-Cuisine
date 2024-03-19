import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFetchFavorites } from "../hooks/favorites/useFetchFavorites";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DishCard from "../components/DishCard";

const ProfileScreen = () => {
  const userData = useSelector((state: RootState) => state.user.data);

  const {
    data: favoriteDishesData,
    isLoading: favoriteDishesLoading,
    error: favoriteDishesError,
  } = useFetchFavorites(userData?.uid || null);

  return (
    <ScrollView horizontal>
      {favoriteDishesData && favoriteDishesData.length > 0 ? (
        favoriteDishesData.map((dish: DishCardType) => (
          <DishCard
            key={dish.id}
            id={dish.id}
            title={dish.title}
            image={dish.image}
            imageType={dish.imageType}
          />
        ))
      ) : (
        <Text>No favorites yet</Text>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
