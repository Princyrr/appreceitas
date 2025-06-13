import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../pages/home/HomeScreen';
import LoginScreen from '../pages/login/LoginScreen';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({ setUserLogged }) {
  // Função para logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUserLogged(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair.');
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 18 }}>☰</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
      <Drawer.Screen
        name="Logout"
        component={() => null}
// Você pode trocar por uma tela simples de logout ou uma tela em branco
        options={{
          drawerLabel: () => (
            <TouchableOpacity onPress={handleLogout} style={{ padding: 10 }}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Sair</Text>
            </TouchableOpacity>
          ),
          // Evitar header para tela Logout
          headerShown: false,
        }}
        listeners={{
          // Evita abrir essa tela ao clicar
          drawerItemPress: e => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Drawer.Navigator>
  );
}
