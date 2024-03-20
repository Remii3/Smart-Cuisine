import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../Router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constants/firebaseConfig";
import { fetchUser } from "../store/reducers/userSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import CustomTextInput from "../components/UI/CustomTextInput";
import CustomMainButton from "../components/UI/CustomMainButton";
import CustomPlainButton from "../components/UI/CustomPlainButton";
import { colors } from "../../constants/colors";

type Props = DrawerScreenProps<RootDrawerParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const onLogin = async () => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    dispatch(fetchUser(user.uid));

    navigation.navigate("Home");
    setEmail("");
    setPassword("");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Hello again!</Text>
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <CustomTextInput placeholder={"Email"} onChangeText={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <CustomTextInput
            placeholder={"Password"}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomMainButton title="Sign in" onPress={onLogin} />
          <CustomPlainButton
            title="Need a new account?"
            onPress={goToRegister}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 40,
  },

  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  loginContainer: {
    width: "80%",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
});
