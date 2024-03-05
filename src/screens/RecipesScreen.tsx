import { DrawerScreenProps } from "@react-navigation/drawer";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList>;

export default function RecipesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Recipes</Text>
      <Button
        title="Go to Recipe"
        onPress={() => navigation.navigate("Recipe", { productId: "#" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
