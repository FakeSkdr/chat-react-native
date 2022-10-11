import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import uuid from "react-native-uuid";

import { MessagingService } from "./messaging.service";
import { UsernameModal } from "./username.modal";

export default function App({
  messagingService = MessagingService.getInstance()
}) {
  const [chatlogs, setChatlogs] = useState([]);
  const [username, setUsername] = useState("Me");
  const [message, setMessage] = useState("");

  useEffect(() => {
    messagingService.setupListeners({ onMessages });
  }, []);

  const sendMessage = () => {
    if (message.trim().length === 0) {
      return;
    }

    messagingService.sendMessage({ username, message, id: uuid.v4() });

    setMessage("");
  };

  const onMessages = (messages = []) => {
    const logs = Object.keys(messages).map(key => messages[key]);

    setChatlogs(logs);
  };

  return (
    <View style={styles.container}>
      <UsernameModal
        onUsernameSelect={({ username }) => setUsername(username)}
      ></UsernameModal>
      <FlatList
        style={styles.chatContainer}
        data={chatlogs}
        renderItem={({ item }) => (
          <Text key={item.id}>
            {item.username}: {item.message}
          </Text>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message"
            keyboardType="default"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.button}>
            <Text style={styles.buttonText}>Send a message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 20
  },
  chatContainer: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "#eee"
  },
  footer: {
    justifyContent: "flex-end"
  },
  formContainer: {},
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10
  },
  button: {
    backgroundColor: "#eee",
    margin: 12,
    borderRadius: 5,
    height: 40
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    margin: "auto",
    padding: 5
  }
});
