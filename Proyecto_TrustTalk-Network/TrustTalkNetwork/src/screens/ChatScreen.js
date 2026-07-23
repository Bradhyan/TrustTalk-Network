import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import bg from "./../../assets/images/BG.jpeg";
import Message from "./../components/Message";
import InputBox from "./../components/InputBox";

const ChatScreen = ({ route }) => {
  const API_URL = "http://localhost:3000/api/chats";
  const idquemado = "6554f38c9796674de42e1f51"; // Asegúrate de que este ID sea el ID del usuario actual
  const [chat, setChat] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const iniciarYBuscarChat = async (participanteId1, participanteId2) => {
      setIsFetching(true);
      try {
        // Iniciar el chat
        let chatId;
        const iniciarRespuesta = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            participanteId1: participanteId1,
            participanteId2: participanteId2,
          }),
        });
        const iniciarJson = await iniciarRespuesta.json();
        if (iniciarJson.estado) {
          chatId = iniciarJson.datos._id; // Asume que 'datos' tiene un '_id' del chat iniciado
        } else {
          Alert.alert("Error al iniciar chat", iniciarJson.mensaje);
          setIsFetching(false);
          return;
        }

        // Buscar mensajes del chat por ID
        const mensajesRespuesta = await fetch(
          `http://localhost:3000/api/chat/${chatId}`
        );
        const mensajesJson = await mensajesRespuesta.json();
        if (mensajesJson.estado) {
          setChat(mensajesJson.datos); // 'datos' es el objeto de chat completo
        } else {
          Alert.alert("Error al buscar mensajes", mensajesJson.mensaje);
        }
      } catch (error) {
        Alert.alert("Error de red", "No se pudo conectar con el servidor.");
      } finally {
        setIsFetching(false);
      }
    };

    // Asegúrate de que 'idquemado' y 'route.params.id' son válidos y no el mismo ID antes de llamar a esta función
    iniciarYBuscarChat(idquemado, route.params.id);
  }, [route.params.id]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.container}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={chat ? chat.mensajes : []} 
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Message message={item} userId={idquemado} />
          )}
          inverted
        />
        {chat && <InputBox chatId={chat._id} enviadoPor={idquemado} />} // Solo
        mostrar InputBox si 'chat' no es null
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Tus estilos aquí
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "space-between",
  },
  // Añade el resto de tus estilos aquí
});

export default ChatScreen;
