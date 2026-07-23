import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  Button,
  Pressable,
  View,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

const API_URL = "http://localhost:3000/api/contactos";

const ContactListItem = ({ user, onUpdateContact, onDeleteContact }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [contactForm, setContactForm] = useState({
    usuario: "",
    nombre: "",
    telefono: "",
    email: "",
    fotoPerfil: "",
    infoAdicional: "",
  });

  const handleInputChange = (name, value) => {
    setContactForm({ ...contactForm, [name]: value });
  };

  const actualizarContacto = async () => {
    // Llama al método del padre pasándole el id y el formulario de contacto actualizado
    onUpdateContact(user._id, contactForm);
    // Cierra el modal
    setModalVisible(false);
  };

  const eliminarContacto = async () => {
    onDeleteContact(user._id);
    setModalVisible(false);
  };

  const onPressContact = () => {
    setContactForm({
      usuario: user.usuario,
      nombre: user.nombre,
      telefono: user.telefono,
      email: user.email,
      fotoPerfil: user.fotoPerfil,
      infoAdicional: user.infoAdicional,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable onPress={onPressContact} style={styles.container}>
        <Image source={{ uri: user.fotoPerfil }} style={styles.img} />
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {user.nombre}
          </Text>
          <Text style={styles.info} numberOfLines={1}>
            {user.infoAdicional}
          </Text>
        </View>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Modifica el Contacto</Text>
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
            title="Actualizar Contacto"
            onPress={actualizarContacto}
          />

          <Button
            style={styles.button}
            title="Eliminar Contacto"
            onPress={eliminarContacto}
          />
          <Button style={styles.button} title="Cerrar" onPress={closeModal} />
        </View>
      </Modal>
    </>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  modalContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: "#1c1c1e", // Fondo del modal en modo oscuro
    borderRadius: 10,
    padding: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  info: {
    color: "grey",
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
