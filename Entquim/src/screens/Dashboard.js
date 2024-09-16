// src/screens/Dashboard.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../css/DashboardStyles'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta

export default function Dashboard({ navigation }) {
  const { logout } = useAuth(); // Obtén la función de logout del contexto

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sí',
        onPress: () => {
          logout(); // Llama a la función de logout para actualizar el estado global
          navigation.navigate('Bienvenido'); // Redirige a la pantalla de bienvenida
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.text}>Estás logueado. Bienvenido al Dashboard.</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
