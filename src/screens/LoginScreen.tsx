import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constants/firebaseConfig";
import { fetchUser } from "../store/reducers/userSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

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
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <View>
        <Text>Email</Text>
        <TextInput onChangeText={setEmail} />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput onChangeText={setPassword} />
      </View>
      <Button title="Login" onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({});
