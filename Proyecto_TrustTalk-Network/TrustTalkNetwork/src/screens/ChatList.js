import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Text } from 'react-native'
import chats from "./../../assets/data/chats.json"
import ChatItem from '../components/ChatItem'

export default function ChatList() {
  const API_URL = "http://localhost:3000/api/contactos";
  const [contactos, setContactos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

   const cargarContactos = async () => {
     setIsFetching(true);
     try {
       const response = await fetch(API_URL);
       const json = await response.json();
       if (json.estado) {
         setContactos(json.datos);
       } else {
         Alert.alert("Error", json.mensaje);
       }
     } catch (error) {
       Alert.alert("Error", "No se pudo cargar la lista de contactos.");
     } finally {
       setIsFetching(false);
     }
   };

   // Cargar contactos al montar
   useEffect(() => {
     cargarContactos();
   }, []);

  return (
    <FlatList
      data={contactos}
      renderItem={({ item }) => <ChatItem chat={item} />}
      style={{ backgroundColor: "black" }}
    />
  );
}
