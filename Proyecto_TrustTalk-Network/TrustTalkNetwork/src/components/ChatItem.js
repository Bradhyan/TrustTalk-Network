import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ChatItem = ({ chat }) => {
  console.log("Esto llega al chat", chat)
  const navigation = useNavigation();

  const formatRelativeTime = (date) => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  };

  return (
    <TouchableHighlight
      underlayColor="underlayColor"
      onPress={() =>
        navigation.navigate("Chat", { id: chat._id, name: chat.nombre })
      }
    >
      <View style={styles.container}>
        <Image source={{ uri: chat.fotoPerfil }} style={styles.img} />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>
              {chat.nombre}
            </Text>
            <Text style={styles.sub}>{formatRelativeTime(chat.updatedAt)}</Text>
          </View>
          <Text numberOfLines={2} style={styles.sub}>
            {chat.infoAdicional}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  img: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#000", // Fondo oscuro para el modo oscuro
    padding: 10,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#3a3a3c", // Color de línea separadora para modo oscuro
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    color: "white", // Texto claro para el modo oscuro
    fontSize: 18,
  },
  sub: {
    color: "#8e8e93", // Gris claro para texto secundario en modo oscuro
    fontSize: 15,
  },
});
