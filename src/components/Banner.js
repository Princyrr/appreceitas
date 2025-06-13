// src/components/Banner.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


// pega a largura da tela para o banner ficar responsivo
const { width } = Dimensions.get('window');

const Banner = () => {
  return (
    <LinearGradient
      colors={['#FFEBA9', '#FEF5E6']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
     locations={[0.5, 0.5]} 
      style={styles.container}
    >
      <Image source={require('../../assets/hh.png')} style={styles.image} resizeMode="contain" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 200,  // altura do banner, pode ajustar
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,    // ajuste o tamanho da imagem
    height: 250,
  },
});

export default Banner;
