import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { useAddToFavorites } from "../hooks/favorites/useAddToFavorites";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = DrawerScreenProps<RootDrawerParamList, "Recipe">;

export default function RecipeScreen({ route }: Props) {
  const { mutate: addToFavorites, isLoading, isError } = useAddToFavorites();
  const data = useSelector((state: RootState) => state.user.data);

  const onAddToFavorites = () => {
    addToFavorites({
      userId: data!.uid,
      itemId: route.params.productId,
      itemType: "dish",
    });
  };
  return (
    <View>
      <Text>RecipeScreen</Text>
      <Text>ID: {route.params.productId}</Text>
      <TouchableOpacity onPress={() => onAddToFavorites()}>
        <Text>Add to favorites</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
