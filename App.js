import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { LoginModal } from "./src/components/login.modal";
import { Chat } from "./src/pages/chat.component";

import { store } from "./src/store/store";

function App() {
  return (
    <View style={styles.container}>
      <LoginModal></LoginModal>

      <Chat></Chat>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 20
  }
});

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
