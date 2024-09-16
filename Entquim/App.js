// src/App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Bienvenido from './src/screens/Bienvenido';
import IniciarSesion from './src/screens/IniciarSesion';
import Registro from './src/screens/Registro';
import Dashboard from './src/screens/Dashboard'; // Importa la pantalla Dashboard
import CustomHeader from './src/components/CustomHeader';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Stack.Navigator initialRouteName="Bienvenido">
          <Stack.Screen
            name="Bienvenido"
            component={Bienvenido}
            options={({ navigation }) => ({
              header: () => <CustomHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="IniciarSesion"
            component={IniciarSesion}
            options={({ navigation }) => ({
              header: () => <CustomHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={({ navigation }) => ({
              header: () => <CustomHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Dashboard" // Agrega esta línea
            component={Dashboard} // Agrega esta línea
            options={({ navigation }) => ({
              header: () => <CustomHeader navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
