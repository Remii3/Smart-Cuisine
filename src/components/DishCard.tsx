import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../Router";

type Props = DrawerNavigationProp<RootDrawerParamList>;

export default function DishCard({
  id,
  image,
  imageType,
  title,
  direction,
}: DishCardType) {
  const navigation = useNavigation<Props>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Recipe", { productId: id })}
    >
      <View
        style={[
          styles.card,
          direction === "vertical" ? styles.vertical : styles.horizontal,
        ]}
      >
        <View style={styles.imageContainer}>
          <View style={styles.imageOverlay} />
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
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
    margin: 10,
  },
  vertical: {
    height: 200,
  },
  horizontal: {
    width: 250,
    height: 200,
  },
  imageContainer: {
    width: "100%",
    height: "78%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "relative",
  },
  imageOverlay: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    textAlign: "left",
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
