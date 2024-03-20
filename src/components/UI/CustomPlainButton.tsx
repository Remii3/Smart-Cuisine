import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

type Props = {
  onPress: () => void;
  title: string;
};

const CustomPlainButton = ({ onPress, title }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomPlainButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.secondary,
  },
});
