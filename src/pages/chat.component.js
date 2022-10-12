import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";

import { Messages } from "../components/messages.component";
import { MessagingService } from "../services/messaging.service";

export const Chat = ({ messagingService = MessagingService.getInstance() }) => {
  const username = useSelector(state => state.user.username);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim().length === 0) {
      return;
    }

    messagingService.sendMessage({ username, message, id: uuid.v4() });

    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Messages style={styles.chatContainer}></Messages>

      <View style={styles.footer}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 20
  },
  chatContainer: {
    flex: 1,
    marginVertical: 10
  },
  footer: {
    justifyContent: "flex-end"
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10
  },
  button: {
    backgroundColor: "#090",
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
