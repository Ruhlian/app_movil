// src/screens/Bienvenido.js
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import styles from '../css/BienvenidoStyles';

export default function Bienvenido({ navigation }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert(
        'Ya estás logueado',
        'Ya has iniciado sesión. Serás redirigido al Dashboard.',
        [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
      );
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Image
        source={{ uri: 'https://example.com/imagen.jpg' }}
        style={styles.image}
      />
      <Text style={styles.text}>
        En ENTQUIM, nos especializamos en ofrecerte soluciones efectivas y confiables para el control de plagas.
      </Text>

      {!isAuthenticated ? (
        <>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('IniciarSesion')}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonSecondary} 
            onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.buttonSecondaryText}>Registrarse</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.infoText}>
          Para acceder al panel, selecciona el icono de cuenta en la parte superior derecha.
        </Text>
      )}
    </View>
  );
}
