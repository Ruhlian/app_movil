// src/screens/Registro.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { registerUser } from '../services/apiClient';
import styles from '../css/RegistroStyles';
import { useAuth } from '../context/AuthContext';

export default function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert('Ya estás registrado', 'Ya tienes tu cuenta en la aplicación.');
      navigation.navigate('Bienvenido');
    }
  }, [isAuthenticated, navigation]);

  const handleRegister = async () => {
    let valid = true;

    // Validar email
    if (!email.includes('@')) {
      setEmailError('El email debe contener un @.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validar contraseña
    const passwordRegex = /^[a-zA-Z0-9]*$/; // Permite solo letras y números
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('La contraseña solo puede contener letras y números.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      await registerUser(email, password);
      Alert.alert('Éxito', '¡Registro exitoso!');
      navigation.navigate('IniciarSesion');
    } catch (error) {
      Alert.alert('Error', error.message || 'Algo salió mal');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Regístrate para continuar</Text>
      
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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('IniciarSesion')}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
