// src/components/CustomHeader.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Image, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../css/CustomHeaderStyles';
import { useAuth } from '../context/AuthContext';

const CustomHeader = ({ navigation }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          onPress: () => {
            logout();
            handleCloseModal();
            navigation.navigate('Bienvenido');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Bienvenido')}>
        <Icon name="home-outline" size={30} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="person-outline" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Icon name="close" size={30} color="#000" />
            </TouchableOpacity>

            {isAuthenticated ? (
              <>
                <Icon name="checkmark-circle-outline" size={50} color="green" />
                <Text style={styles.modalText}>Estás logueado como:</Text>
                <Text style={styles.modalText}>{user.email}</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    handleCloseModal();
                    navigation.navigate('Dashboard');
                  }}
                >
                  <Text style={styles.buttonText}>Ir al Panel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Icon name="alert-circle-outline" size={50} color="red" />
                <Text style={styles.modalText}>No estás logueado</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    handleCloseModal();
                    navigation.navigate('IniciarSesion');
                  }}
                >
                  <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    handleCloseModal();
                    navigation.navigate('Registro');
                  }}
                >
                  <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomHeader;
