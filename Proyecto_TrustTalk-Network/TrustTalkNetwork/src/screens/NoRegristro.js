import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NoRegistro() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image 
                source={require("../assets/sinregistro.png")} 
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.infoText}>Debes estar logueado para acceder a esta información</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: screenWidth * 0.5,
        marginBottom: 20,
        height: screenWidth * 0.5,
    },
    infoText: {
        marginBottom: 20,
        fontSize: 18,  // Aumentado para mejorar legibilidad
        textAlign: 'center',
        color: '#2c2c2c'  // Color más oscuro para mejorar contraste
    },
    button: {
        backgroundColor: "#2980b9",  // Azul más oscuro para mejorar contraste
        borderRadius: 5,
        padding: 15,
        width: '80%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,  // Aumentado para mejorar legibilidad
    },
});
