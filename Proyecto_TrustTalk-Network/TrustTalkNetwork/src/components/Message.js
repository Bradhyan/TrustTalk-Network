import { View, Text, StyleSheet } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Message = ({ message, userId }) => {
  const isMyMessage = () => {
    return message.enviadoPor && message.enviadoPor._id === userId;
  };

  return (
    <View
      style={[
        styles.container,
        isMyMessage() ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text
        style={[styles.text, isMyMessage() ? styles.myText : styles.otherText]}
      >
        {message.texto}{" "}
      </Text>
      <Text style={styles.time}>
        {message.fechaEnvio ? dayjs(message.fechaEnvio).fromNow() : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 10,
    borderRadius: 15,
    maxWidth: "100%",
  },
  myMessage: {
    backgroundColor: "#0a84ff", // Azul que es visible en modo oscuro
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#202020", // Gris oscuro para contraste
    alignSelf: "flex-start",
  },
  text: {
    color: "white", // Texto blanco para modo oscuro
  },
  myText: {
    color: "white", // Asegurar que el texto es blanco para los mensajes propios
  },
  otherText: {
    color: "white", // Asegurar que el texto es blanco para otros mensajes
  },
  time: {
    color: "#8e8e93", // Gris claro para texto secundario en modo oscuro
    alignSelf: "flex-end",
    marginTop: 4,
    fontSize: 12, // Tamaño más pequeño para la marca de tiempo
  },
});

export default Message;
