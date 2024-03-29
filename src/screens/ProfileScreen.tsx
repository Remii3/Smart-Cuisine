import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFetchFavorites } from "../hooks/favorites/useFetchFavorites";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import DishCard from "../components/DishCard";
import ScreenLoader from "../components/UI/ScreenLoader";
import ScreenError from "../components/UI/ScreenError";
import CustomMainButton from "../components/UI/CustomMainButton";
import { signOut } from "firebase/auth";
import { auth } from "../../constants/firebaseConfig";
import { colors } from "../../constants/colors";

const ProfileScreen = () => {
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();
  const {
    data: favoriteDishesData,
    isLoading: favoriteDishesLoading,
    error: favoriteDishesError,
  } = useFetchFavorites(userData?.uid || null);

  if (favoriteDishesLoading) {
    return <ScreenLoader />;
  }

  if (favoriteDishesError instanceof Error) {
    return <ScreenError message={favoriteDishesError.message} />;
  }
  const logoutHandler = () => {
    signOut(auth).then(() => {
      dispatch({ type: "user/logout" });
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Favorites</Text>
        <ScrollView>
          {favoriteDishesData && favoriteDishesData.length > 0 ? (
            favoriteDishesData.map((dish: DishCardType) => (
              <DishCard
                key={dish.id}
                id={dish.id}
                title={dish.title}
                image={dish.image}
                imageType={dish.imageType}
                direction="horizontal"
              />
            ))
          ) : (
            <Text>No favorites yet</Text>
          )}
        </ScrollView>
      </View>
      <CustomMainButton
        title="Logout"
        onPress={logoutHandler}
        color={colors.danger}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.backgroundColor,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
});
