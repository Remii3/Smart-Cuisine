import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

const ScreenLoader = () => {
  return (
    <View style={styles.infoContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ScreenLoader;

const styles = StyleSheet.create({
  infoContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
