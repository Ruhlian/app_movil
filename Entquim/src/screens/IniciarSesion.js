// src/screens/IniciarSesion.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../css/IniciarSesionStyles';
import { loginUser } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';

export default function IniciarSesion({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Dashboard');
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    let valid = true;

    if (!email.includes('@')) {
      setEmailError('El email debe contener un @.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      const user = await loginUser(email, password);
      login(user);
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Credenciales inválidas',
        [
          { text: 'Intentar de nuevo', onPress: () => {
              setEmail('');
              setPassword('');
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia tu sesión</Text>
      <Text style={styles.subtitle}>Continúa con tu cuenta</Text>
      
      <TextInput
        placeholder="Email"
        style={[styles.textInput, emailError && styles.inputError]}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Contraseña"
        style={[styles.textInput, passwordError && styles.inputError]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}
