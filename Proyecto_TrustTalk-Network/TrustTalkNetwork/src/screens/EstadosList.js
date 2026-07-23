import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
  Modal,
  Button,
  StyleSheet,
  View,
} from "react-native";
import EstadoItem from "./EstadosItem";
import { TextInput } from "react-native-gesture-handler";

export default function EstadosList() {
  const API_URL = "http://localhost:3000/api/estados";
  const [estados, setEstados] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [estadoActivo, setEstadoActivo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [estadoForm, setEstadoForm] = useState({
    usuario: '5f3e85b5bc9b202b38d86125',
    contenido: {
      texto: "",
      imagen: "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const cargarEstados = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      if (json.estado) {
        setEstados(json.datos);
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la lista de Estados.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    cargarEstados();
  }, []);

  const handleInputChange = (campo, valor) => {
    setEstadoForm((estadoAnterior) => ({
      ...estadoAnterior,
      contenido: {
        ...estadoAnterior.contenido,
        [campo]: valor,
      },
    }));
  };

  const saveEstado = async () => {
    const datosEstado = {
      usuario: estadoForm.usuario,
      contenido: {
        texto: estadoForm.contenido.texto,
        imagen: estadoForm.contenido.imagen,
      },
      // Aquí puedes agregar más campos si tu API los requiere
    };

    if (isEditing) {
      await editarEstado(estadoActivo._id, datosEstado);
    } else {
      await publicarEstado(datosEstado);
    }
    setEstadoForm({
      usuario: null,
      contenido: {
        texto: "",
        imagen: "",
      },
    }); // Limpiar formulario
    setModalVisible(false);
    setIsEditing(false); // Restablecer el modo de edición
  };

  const openEditModal = (estado) => {
    if (estado && estado.contenido) {
      setEstadoForm({
        contenido: {
          texto: estado.contenido.texto || "",
          imagen: estado.contenido.imagen || "",
        },
      });
      setIsEditing(true);
      setModalVisible(true);
    } else {
      Alert.alert("Error", "El estado no tiene contenido definido.");
    }
  };

  // Función para publicar un nuevo estado
  const publicarEstado = async (datosEstado) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEstado),
      });
      const json = await response.json();
      if (json.estado) {
        Alert.alert("Éxito", "Estado publicado correctamente.");
        cargarEstados(); // Recargar estados para mostrar el nuevo estado
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo publicar el estado.");
    }
  };

  // Función para editar un estado existente
  const editarEstado = async (id, datosEstado) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEstado),
      });
      const json = await response.json();
      if (json.estado) {
        Alert.alert("Éxito", "Estado actualizado correctamente.");
        cargarEstados(); // Recargar estados para mostrar el estado actualizado
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el estado.");
    }
  };

  // Función para eliminar un estado
  const eliminarEstado = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (json.estado) {
        Alert.alert("Éxito", "Estado eliminado correctamente.");
        cargarEstados(); // Recargar estados para quitar el estado eliminado de la lista
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el estado.");
    }
  };

  // Esta función se llama cuando se selecciona un estado para ver
  const verEstado = (estado) => {
    setEstadoActivo(estado);
  };

  // Cierra el estado activo
  const cerrarEstado = () => {
    setEstadoActivo(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Publicar Estado" onPress={() => setModalVisible(true)} />
      <br />
      <br />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {isEditing ? "Editar Estado" : "Publicar un Estado"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="ID del Usuario"
            value={estadoForm.usuario || ""}
            onChangeText={(text) =>
              setEstadoForm({
                ...estadoForm,
                usuario: text,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Texto del Estado"
            value={estadoForm.contenido.texto}
            onChangeText={(text) => handleInputChange("texto", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="URL de la Imagen"
            value={estadoForm.contenido.imagen}
            onChangeText={(text) => handleInputChange("imagen", text)}
          />
          <Button title="Guardar Estado" onPress={saveEstado} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <FlatList
        data={estados}
        onRefresh={cargarEstados}
        refreshing={isFetching}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => verEstado(item)}>
            <Text>{item.contenido && item.contenido.texto}</Text>
            <Button title="Editar" onPress={() => openEditModal(item)} />
            <Button title="Eliminar" onPress={() => eliminarEstado(item._id)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        style={{ backgroundColor: "white" }}
      />
      {estadoActivo && (
        <EstadoItem estado={estadoActivo} onClose={cerrarEstado} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10, // bordes más redondeados
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600", // iOS utiliza pesos seminegritos
    marginBottom: 15,
    color: "#000", // texto oscuro para mayor contraste
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ccc", // bordes más claros
    padding: 10,
    width: "90%",
    borderRadius: 5, // bordes ligeramente redondeados
    backgroundColor: "#f9f9f9", // fondo más claro para las entradas de texto
  },
  button: {
    backgroundColor: "#000", 
    color: "#fff", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
