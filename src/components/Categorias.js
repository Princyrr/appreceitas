import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const categorias = [
  { nome: 'Refeições', imagem: require('../../assets/comida.jpg') },
  { nome: 'Petiscos', imagem: require('../../assets/aa.png') },
  { nome: 'Saladas', imagem: require('../../assets/salada.jpg') },
  { nome: 'Sopas', imagem: require('../../assets/sopa.jpg') },
  { nome: 'Doces', imagem: require('../../assets/doces.jpg') },
  { nome: 'Vegano', imagem: require('../../assets/vegano.jpg') },
];

const Categorias = () => {
  return (
    <View style={styles.container}>
      {categorias.map((item, index) => (
        <View key={index} style={styles.item}>
          <Image source={item.imagem} style={styles.imagem} />
          <Text style={styles.texto}>{item.nome}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  item: {
    width: '40%',
    alignItems: 'center',
    marginVertical: 15,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50, // círculo
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Categorias;
