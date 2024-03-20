import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ScreenError = ({ message }: { message: string }) => {
  return (
    <View style={styles.infoContainer}>
      <Text>Error: {message}</Text>
    </View>
  );
};

export default ScreenError;

const styles = StyleSheet.create({
  infoContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
