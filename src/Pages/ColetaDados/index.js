import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export function ColetaDados({ route, navigation }) {
  const pesquisaId = route?.params?.pesquisaId;
  const [nomePesquisa, setNomePesquisa] = useState('');
  const [avaliacao, setAvaliacao] = useState('');

  useEffect(() => {
    const fetchPesquisaName = async () => {
      if (!pesquisaId) return;

      try {
        const pesquisaRef = doc(db, "pesquisas", pesquisaId);
        const pesquisaSnap = await getDoc(pesquisaRef);

        if (pesquisaSnap.exists()) {
          const pesquisaData = pesquisaSnap.data();
          setNomePesquisa(pesquisaData.nome);
        }
      } catch (error) {
        console.error("Erro ao buscar nome da pesquisa:", error);
      }
    };

    fetchPesquisaName();
  }, [pesquisaId]);

  const handleAvaliacao = async (rating) => {
    if (!pesquisaId) return;

    try {
      const pesquisaRef = doc(db, "pesquisas", pesquisaId);
      const pesquisaSnap = await getDoc(pesquisaRef);

      if (!pesquisaSnap.exists()) {
        console.error("Erro: Pesquisa não encontrada no Firestore.");
        return;
      }

      const pesquisaData = pesquisaSnap.data();
      const votosAtualizados = { ...pesquisaData.votos } || {};

      votosAtualizados[rating] = (votosAtualizados[rating] || 0) + 1;

      await updateDoc(pesquisaRef, { votos: votosAtualizados });

      setAvaliacao(rating);
      navigation.navigate("Agradecimento", { pesquisaId });
    } catch (error) {
      console.error("Erro ao registrar voto:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>O que você achou da pesquisa {nomePesquisa}</Text>
      <View style={styles.ratingContainer}>
        {['Péssimo', 'Ruim', 'Neutro', 'Bom', 'Excelente'].map((rating, index) => {
          const iconNames = {
            'Péssimo': 'emoticon-sad-outline',
            'Ruim': 'emoticon-sad',
            'Neutro': 'emoticon-neutral',
            'Bom': 'emoticon-happy',
            'Excelente': 'emoticon-excited',
          };

          const colors = {
            'Péssimo': '#FF0000',
            'Ruim': '#FF4500',
            'Neutro': '#FFD700',
            'Bom': '#00FF00',
            'Excelente': '#32CD32',
          };

          return (
            <TouchableOpacity
              key={index}
              style={[styles.ratingButton, avaliacao === rating && styles.selectedRating]}
              onPress={() => handleAvaliacao(rating)}
            >
              <Icon name={iconNames[rating]} size={65} color={colors[rating]} />
              <Text style={styles.ratingText}>{rating}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 27,
    paddingTop: 30,
    fontFamily: 'AveriaLibre-Bold',
    textAlign: 'center',
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
