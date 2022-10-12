import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";

import { MessagingService } from "../services/messaging.service";

export const Messages = ({
  messagingService = MessagingService.getInstance()
}) => {
  const [chatlogs, setChatlogs] = useState([]);

  useEffect(() => {
    messagingService.setupListeners({ onMessages });
  }, []);

  const onMessages = (messages = []) => {
    const logs = Object.keys(messages).map(key => messages[key]);

    setChatlogs(logs);
  };

  return (
    <FlatList
      data={chatlogs}
      renderItem={({ item }) => (
        <Text key={item.id}>
          {item.username}: {item.message}
        </Text>
      )}
    />
  );
};
