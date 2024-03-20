import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  ...rest
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View
      style={[
        styles.card,
        Platform.OS === "android" ? styles.elevation : styles.shadowProp,
      ]}
    >
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
  },
  elevation: {
    shadowColor: colors.dark,
    elevation: 4,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
