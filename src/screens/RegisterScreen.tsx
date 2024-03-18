import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../constants/firebaseConfig";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { doc, setDoc } from "firebase/firestore";
import { fetchUser } from "../store/reducers/userSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

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
        email: user.email,
      });

      dispatch(fetchUser(user.uid));

      navigation.navigate("Home");
    } catch (err) {
      console.error("Error registering user: ", err);
    }
  };

  return (
    <View>
      <Text>RegisterScreen</Text>
      <View>
        <Text>Email</Text>
        <TextInput onChangeText={setEmail} />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput onChangeText={setPassword} />
      </View>
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}

const styles = StyleSheet.create({});
