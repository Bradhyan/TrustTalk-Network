import React, { useState, useEffect } from "react";
import {
  FlatList,
  Alert,
  Button,
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import ContactListItem from "./../components/ContactListItem";

const API_URL = "http://localhost:3000/api/contactos";

const ContactScreen = () => {
  const [contactos, setContactos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [contactForm, setContactForm] = useState({
    usuario: "",
    nombre: "",
    telefono: "",
    email: "",
    fotoPerfil: "",
    infoAdicional: "",
  });

  // Función para manejar la entrada del formulario
  const handleInputChange = (name, value) => {
    setContactForm({ ...contactForm, [name]: value });
  };

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

  // Agregar contacto
  const agregarContacto = async (nuevoContacto) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoContacto),
      });
      const json = await response.json();
      if (json.estado) {
        cargarContactos(); // Recargar la lista después de agregar
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar el contacto.");
    }
  };

  // Función para abrir el modal para agregar un nuevo contacto
  const openAddModal = () => {
    setCurrentContact(null);
    setContactForm({
      nombre: "",
      telefono: "",
      email: "",
      fotoPerfil: "",
    });
    setModalVisible(true);
  };

  // Función para abrir el modal para editar un contacto existente
  const openEditModal = (contacto) => {
    setCurrentContact(contacto._id);
    setContactForm({
      nombre: contacto.nombre,
      telefono: contacto.telefono,
      email: contacto.email,
      fotoPerfil: contacto.fotoPerfil,
    });
    setModalVisible(true);
  };

  // Función para guardar o actualizar un contacto
  const saveContact = () => {
    if (currentContact) {
      actualizarContacto(currentContact, contactForm);
    } else {
      agregarContacto(contactForm);
    }
    setModalVisible(false);
  };

  const handleUpdateContact = async (contactId, updatedContact) => {
    try {
      // Llamada a la API para actualizar el contacto...
      const response = await fetch(`${API_URL}/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
      });
      const json = await response.json();

      if (json.estado) {
        // Actualiza la lista de contactos en el estado
        setContactos(
          contactos.map((contact) =>
            contact._id === contactId
              ? { ...contact, ...updatedContact }
              : contact
          )
        );
        Alert.alert("Éxito", "Contacto actualizado correctamente");
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el contacto.");
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      // Llamada a la API para eliminar el contacto...
      const response = await fetch(`${API_URL}/${contactId}`, {
        method: "DELETE",
      });
      const json = await response.json();

      if (json.estado) {
        // Actualiza la lista de contactos en el estado
        setContactos(contactos.filter((contact) => contact._id !== contactId));
        Alert.alert("Éxito", "Contacto eliminado correctamente");
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el contacto.");
    }
  };

  // Interfaz de usuario
  return (
    <View style={styles.screen}>
      <Button title="Agregar Contacto" onPress={openAddModal} color="#0a84ff" />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Agrega un Contacto</Text>
          <Text style={styles.textInputLabel}>Usuario:</Text>
          <TextInput
            style={styles.textInput}
            value={contactForm.usuario}
            onChangeText={(text) => handleInputChange("usuario", text)}
          />
          <Text style={styles.textInputLabel}>Nombre:</Text>
          <TextInput
            style={styles.textInput}
            value={contactForm.nombre}
            onChangeText={(text) => handleInputChange("nombre", text)}
          />
          <Text style={styles.textInputLabel}>Teléfono:</Text>
          <TextInput
            style={styles.textInput}
            value={contactForm.telefono}
            onChangeText={(text) => handleInputChange("telefono", text)}
          />
          <Text style={styles.textInputLabel}>Email:</Text>
          <TextInput
            style={styles.textInput}
            value={contactForm.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Text style={styles.textInputLabel}>Foto (URL):</Text>
          <TextInput
            style={styles.textInput}
            value={contactForm.fotoPerfil}
            onChangeText={(text) => handleInputChange("fotoPerfil", text)}
          />
          <Text style={styles.textInputLabel}>Descripcion:</Text>
          <TextInput
            style={styles.textInput}
            value={contactForm.infoAdicional}
            onChangeText={(text) => handleInputChange("infoAdicional", text)}
          />
          <Button
            style={styles.button}
            title="Guardar Contacto"
            onPress={saveContact}
          />
          <Button
            style={styles.button}
            title="Cancelar"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>

      <FlatList
        data={contactos}
        renderItem={({ item }) => (
          <ContactListItem
            user={item}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        onRefresh={cargarContactos}
        refreshing={isFetching}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000", // Fondo oscuro
  },
  modalContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: "#1c1c1e", // Fondo del modal en modo oscuro
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white", // Texto claro
  },
  textInput: {
    backgroundColor: "#2c2c2e", // Fondo para los inputs
    color: "white", // Texto de input
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    backgroundColor: "#000",
    color: "white", // Fondo oscuro para la lista
  },
  textInput: {
    backgroundColor: "#3a3a3c", // Fondo para los inputs
    color: "white", // Texto de input
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 18,
  },
  textInputLabel: {
    fontSize: 16,
    color: "#8e8e93", // Color para el texto de etiqueta
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#0a84ff", // Fondo para botones primarios
    color: "white", // Texto del botón
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ContactScreen;
