// src/screens/NotImplementedScreen.js

import { View, Text, Image, StyleSheet } from "react-native";

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estamos en Desarrollo</Text>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/011/030/462/original/cute-robot-character-illustration-hand-drawn-design-png.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  image: {
    width: "80%",
    aspectRatio: 2 / 1,
  },
});

export default NotImplementedScreen;