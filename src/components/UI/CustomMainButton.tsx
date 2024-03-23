import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

type Props = {
  onPress: () => void;
  title: string;
  color?: string;
};

const CustomMainButton = ({ onPress, title, color }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color ? color : colors.primary },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomMainButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.dark,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
