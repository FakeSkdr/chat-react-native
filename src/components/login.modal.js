import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput
} from "react-native";
import { useDispatch } from "react-redux";

import { setUsername } from "../store/userSlice";

export const LoginModal = () => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);
  const [user, setUser] = useState("");

  const onClose = () => {
    if (user.trim().length === 0) {
      return;
    }

    setModalVisible(!modalVisible);

    dispatch(setUsername(user));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={user}
            onChangeText={setUser}
            placeholder="Enter your username"
            keyboardType="default"
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Begin to chat</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10
  }
});
