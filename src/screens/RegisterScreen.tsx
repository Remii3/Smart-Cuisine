import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../constants/firebaseConfig";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../Router";
import { doc, setDoc } from "firebase/firestore";
import { fetchUser } from "../store/reducers/userSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import CustomTextInput from "../components/UI/CustomTextInput";
import CustomMainButton from "../components/UI/CustomMainButton";
import CustomPlainButton from "../components/UI/CustomPlainButton";
import { colors } from "../../constants/colors";

type Props = DrawerScreenProps<RootDrawerParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const onRegister = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: user.email,
      });

      dispatch(fetchUser(user.uid));

      navigation.navigate("Home");
    } catch (err) {
      throw new Error("Error registering user");
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Welcome visitor!</Text>
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
          <CustomMainButton title="Sign up" onPress={onRegister} />
          <CustomPlainButton
            title="Already have an account?"
            onPress={goToLogin}
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
