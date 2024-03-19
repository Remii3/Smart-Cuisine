import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { colors } from "../../constants/colors";
type Props = DrawerScreenProps<RootDrawerParamList>;

const HomeScreen = ({ navigation }: Props) => {
  const [searchPrompt, setSearchPrompt] = useState<any>("");

  const searchRecipes = async () => {
    navigation.navigate("Search", { prompt: searchPrompt });
    setSearchPrompt("");
  };

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
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Search for recipes"
            onChangeText={setSearchPrompt}
            value={searchPrompt}
            onSubmitEditing={() => searchRecipes()}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
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
    height: 720,
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
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    color: colors.dark,
    backgroundColor: colors.white,
  },
});
