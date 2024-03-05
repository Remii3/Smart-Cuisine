import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList>;

const HomeScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BASE_URL}homepage_img.webp?alt=media&token=49be2de6-6ca8-410b-a36b-86ed1b776a63`,
        }}
        style={styles.img}
      />
      <View style={styles.overlay}></View>
      <View>
        <Text style={styles.title}>Smart cuisine</Text>
      </View>
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
    height: "95%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "95%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "white",
  },
});
