import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./src/store/store";

import { LoginModal } from "./src/components/login.modal";

import { Chat } from "./src/pages/chat.component";
import { Account } from "./src/pages/account.component";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Provider store={store}>
      <LoginModal></LoginModal>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ navigation }) => ({
              title: "Just chatting",
              headerRight: () => (
                <Button
                  onPress={() => navigation.push("Account")}
                  title="Account"
                />
              )
            })}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ title: "My account" }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </Provider>
  );
};
