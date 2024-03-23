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
import { RootDrawerParamList } from "../../Router";
import { useAddToFavorites } from "../hooks/favorites/useAddToFavorites";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "react-query";
import { useFetchFavorites } from "../hooks/favorites/useFetchFavorites";
import { useRemoveFromFavorites } from "../hooks/favorites/useRemoveFromFavorites";
import { colors } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

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
  } = useQuery(["dish", route.params.productId], () =>
    fetchDish({ id: route.params.productId })
  );

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
    <View style={styles.container}>
      {dishLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!dishLoading && dishData && (
        <>
          <View style={styles.imgContainer}>
            <Image source={{ uri: dishData.image }} style={styles.img} />
            <View style={styles.imgOverlay} />
          </View>
          <ScrollView style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>{dishData.title}</Text>
              {favoriteDishesData &&
              favoriteDishesData.find(
                (item: { id: string }) => item.id === route.params.productId
              ) ? (
                <TouchableOpacity
                  disabled={
                    !userData ||
                    removeFromFavoritesLoading ||
                    favoriteDishesLoading
                  }
                  onPress={() => onRemoveFromFavorites()}
                >
                  <Ionicons
                    name="heart-circle-sharp"
                    size={32}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={
                    !userData || addToFavoritesLoading || favoriteDishesLoading
                  }
                  onPress={() => onAddToFavorites()}
                >
                  <Ionicons
                    name="heart-circle-outline"
                    size={32}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
    padding: 10,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  imgContainer: {
    position: "relative",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  img: {
    aspectRatio: 16 / 9,
    objectFit: "cover",
    width: "100%",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  imgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  b: {
    fontWeight: "bold",
    // Ensure the text remains inline
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
