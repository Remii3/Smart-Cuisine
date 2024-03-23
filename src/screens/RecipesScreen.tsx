import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import useFetchDishesNavigate from "../hooks/dishes/useFetchDishesNavigate";
import CustomPlainButton from "../components/UI/CustomPlainButton";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../Router";
import ItemsCarousel from "../components/UI/ItemsCarousel";

type Props = DrawerScreenProps<RootDrawerParamList, "Recipes">;

export default function RecipesScreen({ navigation }: Props) {
  const {
    dishesData: lowCarbsData,
    dishesError: lowCarbsError,
    dishesLoading: lowCarbsLoading,
  } = useFetchDishesNavigate({
    extraQuery: "&minCarbs=0&maxCarbs=50",
    fetchname: "lowCarbs",
  });

  const {
    dishesData: lowCaloriesData,
    dishesError: lowCaloriesError,
    dishesLoading: lowCaloriesLoading,
  } = useFetchDishesNavigate({
    extraQuery: "&minCalories=0&maxCalories=50",
    fetchname: "lowCalories",
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.banner}>
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BASE_URL}recipes_img.webp?alt=media&token=9669c37c-0038-4289-9994-1774a65d17cb`,
            }}
            style={styles.img}
          />
          <View style={styles.bannerOverlay} />
          <Text style={styles.bannerText}>Recipes</Text>
        </View>
        <View style={styles.contentStyles}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Low Carbs: </Text>
            <CustomPlainButton
              title="Show more"
              onPress={() => navigation.navigate("Home")}
              customStyle={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.secondary,
              }}
            />
          </View>
          <ItemsCarousel
            dataList={lowCarbsData}
            error={lowCarbsError}
            isLoading={lowCarbsLoading}
          />
        </View>
        <View style={styles.contentStyles}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Low Calories: </Text>
            <CustomPlainButton
              title="Show more"
              onPress={() => navigation.navigate("Home")}
              customStyle={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.secondary,
              }}
            />
          </View>
          <ItemsCarousel
            dataList={lowCaloriesData}
            error={lowCaloriesError}
            isLoading={lowCaloriesLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: "flex-start",
  },
  banner: {
    height: 250,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 30,
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  bannerText: {
    fontSize: 40,
    fontWeight: "600",
    color: colors.light,
    textAlign: "center",
    marginTop: 100,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  dishesContainer: {
    flexDirection: "row",
    maxHeight: 300,
    marginLeft: -10,
    marginRight: -10,
  },

  contentStyles: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 40,
  },
});
