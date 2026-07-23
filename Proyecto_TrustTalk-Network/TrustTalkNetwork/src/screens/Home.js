import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import NoRegristro from './NoRegristro';
import Calculo from './Calculo';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
    const { currentUser } = useAuth();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {currentUser ? <Calculo /> : <NoRegristro />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        
        
    },
});




