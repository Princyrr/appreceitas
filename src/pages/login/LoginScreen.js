import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const response = await fetch('http://192.168.15.8:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva usuário no AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        // Navega para a Home
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/fundo.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../../assets/logo2.png')}
              style={styles.foodImage}
            />
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logoImage}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Icon name="user" size={20} color="#aaa" style={styles.icon} />
              <TextInput
                placeholder="E-mail"
                style={styles.input}
                placeholderTextColor="#555"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
              <TextInput
                placeholder="Senha"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#555"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.signupText}>Cadastro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodImage: {
    width: 250,
    height: 200,
    marginTop: 80,
    marginLeft: 130,
  },
  logoContainer: {
    marginTop: 100,
  },
  logoImage: {
    width: 250,
    height: 120,
    resizeMode: 'contain',
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBA9',
    borderRadius: 6,
    borderBottomColor: '#FF6506',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  loginButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FF6506',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6506',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,
  },
  signupText: {
    color: '#F57C00',
    fontWeight: 'bold',
  },
});
