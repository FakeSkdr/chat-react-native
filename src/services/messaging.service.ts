import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

import { Message } from "./messaging.types";

export class MessagingService {
  static instance: MessagingService;

  static getInstance() {
    if (!MessagingService.instance) {
      MessagingService.instance = new MessagingService();
    }

    return this.instance;
  }

  constructor() {
    // Yes this is a huge security flaw
    const firebaseConfig = {
      apiKey: "AIzaSyB1BCYvkM5CbjpBhbxrD4g594LJOM07qx4",
      authDomain: "chat-44b59.firebaseapp.com",
      databaseURL:
        "https://chat-44b59-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "chat-44b59",
      storageBucket: "chat-44b59.appspot.com",
      messagingSenderId: "570505851931",
      appId: "1:570505851931:web:33a3d4349015af562534be"
    };

    initializeApp(firebaseConfig);
  }

  sendMessage({ id, username, message }: Message) {
    const db = getDatabase();

    const timestamp = Date.now();

    const reference = ref(db, "messages/" + timestamp);

    set(reference, {
      username,
      message,
      id
    });
  }

  setupListeners({
    onMessages
  }: {
    onMessages: (messages: { [key: string]: Message }) => void;
  }): void {
    const db = getDatabase();

    const reference = ref(db, "messages/");

    onValue(reference, snapshot => {
      const messages = snapshot.val();

      onMessages(messages);
    });
  }
}
