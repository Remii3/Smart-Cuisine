import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import RecipesScreen from "./src/screens/RecipesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "./constants/colors";
import RecipeScreen from "./src/screens/RecipeScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store/store";
import type { RootState } from "./src/store/store";
import SearchScreen from "./src/screens/SearchScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import { signOut } from "firebase/auth";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { auth } from "./constants/firebaseConfig";

type RootStackParamList = {
  RootDrawer: undefined;
  Recipe: { productId: string };
  Search: { prompt: string };
};

export type RootDrawerParamList = RootStackParamList & {
  Home: undefined;
  Recipes: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const queryClient = new QueryClient();

const CustomDrawerContent = (props: any) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth).then(() => {
      dispatch({ type: "user/logout" });
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View style={styles}>
        {user.data && <Button title="Logout" onPress={logoutHandler} />}
      </View>
    </DrawerContentScrollView>
  );
};

function DrawerNavigator() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: colors.dark,
          drawerIcon: ({ size, color }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      {user.data ? (
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
          }}
        />
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Sign in",
            }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "Sign up",
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
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
                headerTitle: "",
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerTitle: "",
              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
