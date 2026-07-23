import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GroupItem = ({ chat }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chat.nombre}</Text>
      <Text style={styles.description}>{chat.descripcion}</Text>
      <Text style={styles.date}>
        Creado: {new Date(chat.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});

export default GroupItem;
