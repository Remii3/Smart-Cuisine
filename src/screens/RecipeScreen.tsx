import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { useAddToFavorites } from "../hooks/favorites/useAddToFavorites";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "react-query";
import { useFetchFavorites } from "../hooks/favorites/useFetchFavorites";
import { useRemoveFromFavorites } from "../hooks/favorites/useRemoveFromFavorites";

type Props = DrawerScreenProps<RootDrawerParamList, "Recipe">;

async function fetchDish({ id }: { id: string }) {
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY}`;
  const res = await fetch(url);
  return await res.json();
}

export default function RecipeScreen({ route }: Props) {
  const userData = useSelector((state: RootState) => state.user.data);

  const {
    mutate: addToFavoritesMutate,
    isLoading: addToFavoritesLoading,
    error: addToFavoritesError,
  } = useAddToFavorites();

  const {
    mutate: removeFromFavoritesMutate,
    isLoading: removeFromFavoritesLoading,
    error: removeFromFavoritesError,
  } = useRemoveFromFavorites();

  const {
    data: favoriteDishesData,
    isLoading: favoriteDishesLoading,
    error: favoriteDishesError,
  } = useFetchFavorites(userData?.uid || null);

  const {
    data: dishData,
    isLoading: dishLoading,
    error: dishError,
  } = useQuery("dish", () => fetchDish({ id: route.params.productId }));

  const onAddToFavorites = () => {
    addToFavoritesMutate({
      userId: userData!.uid,
      itemData: {
        id: route.params.productId,
        title: dishData!.title,
        image: dishData!.image,
        imageType: dishData!.imageType,
      },
      itemType: "dish",
    });
  };

  const onRemoveFromFavorites = () => {
    removeFromFavoritesMutate({
      userId: userData!.uid,
      itemId: route.params.productId,
      itemType: "dish",
    });
  };

  return (
    <ScrollView>
      {dishLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!dishLoading && dishData && (
        <View>
          <Image source={{ uri: dishData.image }} style={styles.img} />
          <Text style={{ fontSize: 24 }}>{dishData.title}</Text>
          <Text style={{}}>{dishData.summary}</Text>
          {favoriteDishesData &&
          favoriteDishesData.find(
            (item: { id: string }) => item.id === route.params.productId
          ) ? (
            <TouchableOpacity
              disabled={
                !userData || removeFromFavoritesLoading || favoriteDishesLoading
              }
              onPress={() => onRemoveFromFavorites()}
            >
              <Text>Remove from favorites</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={
                !userData || addToFavoritesLoading || favoriteDishesLoading
              }
              onPress={() => onAddToFavorites()}
            >
              <Text>Add to favorites</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  img: {
    aspectRatio: 16 / 9,
    objectFit: "cover",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
