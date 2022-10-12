import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";

import { MessagingService } from "../services/messaging.service";

export const Messages = ({
  messagingService = MessagingService.getInstance()
}) => {
  const [chatlogs, setChatlogs] = useState([]);

  useEffect(() => {
    messagingService.setupListeners({ onMessage });
  }, []);

  const onMessage = message => {
    setChatlogs(logs => [...logs, message]);
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
