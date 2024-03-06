import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList>;

const HomeScreen = ({}: Props) => {
  const [recipes, setRecipes] = useState<any>(null);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY}`
      );
      const users = await response.json();
      return users;
    }
    getUsers().then((data) => setRecipes(data));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BASE_URL}homepage_img.webp?alt=media&token=49be2de6-6ca8-410b-a36b-86ed1b776a63`,
        }}
        style={styles.img}
      />
      <View style={styles.overlay}></View>
      <View
        style={{
          top: "50%",
          position: "absolute",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Smart cuisine</Text>
      </View>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={styles.titleContainer}></View>
        <View style={styles.itemsContainer}>
          <Text>Test1</Text>
          {recipes && (
            <View>
              <Text>Test2</Text>
              <Image
                source={{
                  uri: `${recipes.recipes[0].image}`,
                }}
                style={styles.foodImg}
              />
            </View>
          )}
          <Text></Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  foodImg: {
    height: 300,
    width: 300,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  titleContainer: {
    height: 750,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "white",
  },
  itemsContainer: {
    height: 500,
    backgroundColor: "white",
  },
});
