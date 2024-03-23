import SearchScreen from "./src/screens/SearchScreen";
import { signOut } from "firebase/auth";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { auth } from "./constants/firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import RecipesScreen from "./src/screens/RecipesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import RecipeScreen from "./src/screens/RecipeScreen";
import type { RootState } from "./src/store/store";
import { colors } from "./constants/colors";
import {
  DrawerHeaderProps,
  DrawerProps,
  DrawerScreenProps,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerLayoutProps } from "react-native-gesture-handler";
import CustomMainButton from "./src/components/UI/CustomMainButton";

type RootStackParamList = {
  RootDrawer: undefined;
  Recipe: { productId: string };
  Search: { prompt: string };
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

export type RootDrawerParamList = RootStackParamList & {
  Home: undefined;
  Recipes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const CustomDrawerContent = (props: any) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth).then(() => {
      dispatch({ type: "user/logout" });
    });
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.drawerContent}
      {...props}
    >
      <View>
        <DrawerItemList {...props} />
      </View>

      <View style={{ padding: 10 }}>
        {user.data && (
          <CustomMainButton
            title="Logout"
            onPress={logoutHandler}
            color={colors.danger}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
};

type Props = DrawerScreenProps<RootDrawerParamList, "RootDrawer">;

function DrawerNavigator({ navigation }: Props) {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.secondary,
        drawerActiveBackgroundColor: colors.primaryBackgroundColor,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: colors.light,
        },
        headerRight: ({ tintColor }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(user.data ? "Profile" : "Login")}
            style={{ marginRight: 16 }}
          >
            {user.data ? (
              <Ionicons
                name="person-circle-sharp"
                size={24}
                color={tintColor}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={24}
                color={tintColor}
              />
            )}
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "",
          title: "Home",
          headerTransparent: true,
          headerTintColor: colors.light,
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
              style={{ marginRight: -16 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: colors.light,
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="restaurant"
              size={size}
              color={color}
              style={{ marginRight: -16 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const Router = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RootDrawer">
        <Stack.Screen
          name="RootDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        {user.data ? (
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Sign in",
                headerTitle: "",
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: "Sign up",
                headerTitle: "",
                headerTransparent: true,
              }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.backgroundColor,
  },
});
