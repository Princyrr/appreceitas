import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.15.8:3000/register', { // ⬅️ Altere para o IP da sua máquina
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data.message || 'Não foi possível cadastrar');
      }
    } catch (error) {
      console.error('❌ Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Falha ao conectar com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Cadastro</Text>

      {/* Inputs */}
      <View style={styles.contimput}>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText1}>Voltar</Text>
          
        </TouchableOpacity></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  justifyContent: 'flex-start', 
  backgroundColor:'#FEF5E6',
    
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    
    backgroundColor: '#FFEBA9',
  },
  logo: {
    marginTop:50,
    marginBottom:2,
    width: 220,
    height: 120,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'aarial',
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderBottomWidth:2,   
    borderColor: '#FF6606',
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFEBA9', // cor de fundo clara e suave
    color: '#7B786F',
    
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:5,
  },
  button: {
    flex: 1,
    backgroundColor: '#FF6506',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop:15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
  borderWidth: 2,
  borderColor: '#FF6606',  
  marginHorizontal: 5,
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contimput:{
padding:20,
  },
  buttonText1:{    
    fontWeight: 'bold',
    textAlign:'center',
    color:'#ff6606',
    

  }
});
