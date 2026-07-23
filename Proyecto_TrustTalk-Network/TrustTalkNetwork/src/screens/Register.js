import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import appFirebase from '../../credenciales';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../../context/AuthContext';

const auth = getAuth(appFirebase);

export default function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useAuth();

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setCurrentUser(user);
            Alert.alert('Éxito', 'Usuario creado con éxito.');
            props.navigation.navigate('Home');
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    Alert.alert('Error', 'El correo electrónico ya está en uso. Prueba con otro.');
                    break;
                case 'auth/invalid-email':
                    Alert.alert('Error', 'El correo electrónico no es válido.');
                    break;
                case 'auth/weak-password':
                    Alert.alert('Error', 'La contraseña es débil. Debe tener al menos 6 caracteres.');
                    break;
                default:
                    Alert.alert('Error', 'Ocurrió un error al crear el usuario. Intente de nuevo.');
                    console.error(error);
                    break;
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require("../assets/useragregar.png")} 
                style={styles.profile}
                resizeMode="contain"
            />
            <View style={styles.card}>
                <TextInput 
                    placeholder="Correo Electrónico" 
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Contraseña" 
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleSignup} style={styles.button}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,                      
        backgroundColor: 'white',      
        alignItems: 'center', 
        justifyContent: 'center'         
    },
    profile: {
        width: screenWidth * 0.3,
        marginBottom: 10,                
        maxHeight: screenWidth * 0.3
    },
    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: screenWidth * 0.9,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        backgroundColor: '#e0e0e0',  // Color más claro para mejorar contraste
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        width: '100%',
    },
    button: {
        backgroundColor: "#2980b9",  // Azul más oscuro para mejorar contraste
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,  // Aumentado para mejorar legibilidad
    }
});
