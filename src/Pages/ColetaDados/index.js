import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function ColetaDados({ navigation }) {
  const [avaliacao, setAvaliacao] = useState('');

  const handleAvaliacao = (rating) => {
    setAvaliacao(rating);
  };

  const handleAgradecimentoPage = () => {
    navigation.navigate('Agradecimento');
  };

  return (
    <View style={styles.container}>
    
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("AcoesPesquisa")}
      >
  
      </TouchableOpacity>

      <Text style={styles.header}>O que você achou do Carnaval 2024?</Text>
      <View style={styles.ratingContainer}>
        <TouchableOpacity
          style={[
            styles.ratingButton,
            avaliacao === 'Péssimo' && styles.selectedRating,
          ]}
          onPress={() => {
            handleAvaliacao('Péssimo');
            handleAgradecimentoPage();
          }}
        >
          <Icon name="emoticon-sad-outline" size={65} color="#FF0000" />
          <Text style={styles.ratingText}>Péssimo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ratingButton,
            avaliacao === 'Ruim' && styles.selectedRating,
          ]}
          onPress={() => {
            handleAvaliacao('Ruim');
            handleAgradecimentoPage();
          }}
        >
          <Icon name="emoticon-sad" size={65} color="#FF0000" />
          <Text style={styles.ratingText}>Ruim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ratingButton,
            avaliacao === 'Neutro' && styles.selectedRating,
          ]}
          onPress={() => {
            handleAvaliacao('Neutro');
            handleAgradecimentoPage();
          }}
        >
          <Icon name="emoticon-neutral" size={65} color="#FFFF00" />
          <Text style={styles.ratingText}>Neutro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ratingButton,
            avaliacao === 'Bom' && styles.selectedRating,
          ]}
          onPress={() => {
            handleAvaliacao('Bom');
            handleAgradecimentoPage();
          }}
        >
          <Icon name="emoticon-happy" size={65} color="#00FF00" />
          <Text style={styles.ratingText}>Bom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ratingButton,
            avaliacao === 'Excelente' && styles.selectedRating,
          ]}
          onPress={() => {
            handleAvaliacao('Excelente');
            handleAgradecimentoPage();
          }}
        >
          <Icon name="emoticon-excited" size={65} color="#00FF00" />
          <Text style={styles.ratingText}>Excelente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    backgroundColor: '#372775',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
  },
  header: {
    color: '#fff',
    fontSize: 27,
    paddingTop: 30,
    fontFamily: 'AveriaLibre-Bold',
  },
  ratingContainer: {
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  ratingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 80,
  },
  selectedRating: {
    backgroundColor: '#2B1D62',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'AveriaLibre-Regular',
  },
});
