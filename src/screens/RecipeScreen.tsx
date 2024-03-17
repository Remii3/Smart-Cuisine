import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList, "Recipe">;

export default function RecipeScreen({ route }: Props) {
  return (
    <View>
      <Text>RecipeScreen</Text>
      <Text>ID: {route.params.productId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
