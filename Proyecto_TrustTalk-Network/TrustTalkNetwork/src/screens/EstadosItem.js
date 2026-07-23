import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const EstadoItem = ({ estado, onClose }) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    // Inicia un intervalo para la barra de progreso
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(interval);
          onClose(); // Cierra el estado cuando la barra de progreso llega a 0
          return 0;
        }
        // Disminuye la barra de progreso con el tiempo
        return prevProgress - 1 / (estado.duracion * 60);
      });
    }, 1000 / (estado.duracion * 60));

    // Limpia el intervalo si el componente se desmonta
    return () => clearInterval(interval);
  }, [estado.duracion, onClose]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <StatusBar hidden />
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        <Image
          source={{ uri: estado.contenido.imagen }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.text}>{estado.contenido.texto}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "80%",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  progressBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "blue",
  },
});

export default EstadoItem;
