import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { setUsername } from "../store/userSlice";
import { RootState } from "../store/store";
import { RootNativeStackParamList } from "../../App";

type Props = {
  navigation: NativeStackNavigationProp<RootNativeStackParamList, "Account">;
};

export const Account = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  const [user, setUser] = useState(username);

  const onSubmit = () => {
    if (user.trim().length === 0) {
      return;
    }

    dispatch(setUsername(user));

    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={user}
        onChangeText={setUser}
        placeholder="Enter your username"
        keyboardType="default"
      />
      <Pressable style={[styles.button, styles.buttonClose]} onPress={onSubmit}>
        <Text style={styles.textStyle}>Update</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});
