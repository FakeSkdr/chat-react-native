import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";

import { MessagingService } from "../services/messaging.service";
import { Message } from "../services/messaging.types";

interface MessagesProps {
  messagingService: MessagingService;
}

export const Messages: React.FC<MessagesProps> = ({
  messagingService = MessagingService.getInstance(),
}) => {
  const [chatlogs, setChatlogs] = useState<Message[]>([]);

  useEffect(() => {
    messagingService.setupListeners({ onMessages });
  }, []);

  const onMessages = (messages: { [key: string]: Message }): void => {
    const logs = Object.keys(messages).map((key) => messages[key]);

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
