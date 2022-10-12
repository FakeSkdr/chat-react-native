import firebase from "firebase/app";
import "firebase/database";

export class MessagingService {
  static instance = null;
  database = null;

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

    firebase.initializeApp(firebaseConfig);

    database = firebase.database();
  }

  sendMessage({ id, username, message }) {
    const timestamp = Date.now();

    const reference = database.ref("messages/" + timestamp);

    reference.set({
      username,
      message,
      id
    });
  }

  setupListeners({ onMessage }) {
    const reference = database.ref("messages/");

    reference.on("child_added", snapshot => {
      const message = snapshot.val();

      onMessage(message);
    });
  }
}
