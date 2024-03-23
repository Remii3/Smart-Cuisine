import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

type Props = {
  onPress: () => void;
  title: string;
  customStyle?: StyleProp<TextStyle>;
};

const CustomPlainButton = ({ onPress, title, customStyle = null }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, customStyle && customStyle]}>{title}</Text>
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
