import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

export class MessagingService {
  static instance = null;

  static getInstance() {
    if (MessagingService.instance == null) {
      MessagingService.instance = new MessagingService();
    }

    return this.instance;
  }

  constructor() {
    // Yes this is a huge security flaw
    const firebaseConfig = {
      apiKey: "AIzaSyB4h0Q7PnOKkVNg7d_b5yz3ZE0Bt4H-8sw",
      authDomain: "chat-6f772.firebaseapp.com",
      databaseURL:
        "https://chat-6f772-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "chat-6f772",
      storageBucket: "chat-6f772.appspot.com",
      messagingSenderId: "42372774729",
      appId: "1:42372774729:web:9188d0b395ed4bcda13898"
    };

    initializeApp(firebaseConfig);
  }

  sendMessage({ id, username, message }) {
    const db = getDatabase();

    const timestamp = Date.now();

    const reference = ref(db, "messages/" + timestamp);

    set(reference, {
      username,
      message,
      id
    });
  }

  setupListeners({ onMessages }) {
    const db = getDatabase();

    const reference = ref(db, "messages/");

    onValue(reference, snapshot => {
      const messages = snapshot.val();

      onMessages(messages);
    });
  }
}
