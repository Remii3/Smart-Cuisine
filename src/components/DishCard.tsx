import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, useNavigation } from "@react-navigation/native";
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerNavigationProp<RootDrawerParamList>;

export default function DishCard({
  id,
  image,
  imageType,
  title,
}: DishCardType) {
  const navigation = useNavigation<Props>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Recipe", { productId: id })}
    >
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "49%",
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
