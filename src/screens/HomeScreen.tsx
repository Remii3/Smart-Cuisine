import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../Router";
import { colors } from "../../constants/colors";
import CustomTextInput from "../components/UI/CustomTextInput";
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
          top: "40%",
          position: "absolute",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 60,
        }}
      >
        <Text style={styles.title}>Smart cuisine</Text>
        <View style={styles.container}>
          <CustomTextInput
            placeholder="Search new dishes"
            onChangeText={setSearchPrompt}
            value={searchPrompt}
            onSubmitEditing={() => searchRecipes()}
            customCardStyles={{
              backgroundColor: "#eee",
            }}
            customTextStyles={{
              fontWeight: "500",
              color: colors.black,
              width: 200,
            }}
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
    fontSize: 48,
    fontWeight: "700",
    color: "white",
  },
});
