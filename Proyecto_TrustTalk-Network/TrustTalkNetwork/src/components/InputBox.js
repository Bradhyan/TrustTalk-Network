import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const InputBox = ({chatId , enviadoPor}) => {
  console.log("ID DEL CHAT", chatId);
  console.log("Enviado por ", enviadoPor);
  const API_URL = "http://localhost:3000/api/chat";
  const [newMessage, setNewMessage] = useState("");

  const onSend = async () => {
    console.log("Entre en onsend")
    if (!newMessage) return;
    console.log("Pase el primer if");
    
    try {
      const response = await fetch(`${API_URL}/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto: newMessage,
          enviadoPor: enviadoPor,
        }),
      });
      const json = await response.json();
      if (json.estado) {
        setNewMessage("");
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el mensaje.");
    }
  };
  return (
    <View style={styles.container}>
      <AntDesign name="plus" size={20} color="royalblue" />
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        style={styles.input}
        placeholder="Escribe un mensaje..."
      />
      <TouchableOpacity onPress={onSend} style={styles.send}>
        <MaterialIcons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 5, // Reducido el padding
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1, // Ajuste dinámico del ancho
    backgroundColor: "white",
    paddingVertical: 2, // Cambiado de padding a paddingVertical
    paddingHorizontal: 10,
    marginHorizontal: 5, // Reducido el margin horizontal
    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    // Estilo para el TouchableOpacity
    backgroundColor: "royalblue",
    padding: 5, // Reducido el padding del botón de envío
    borderRadius: 50,
    overflow: "hidden",
  },
});

export default InputBox;
