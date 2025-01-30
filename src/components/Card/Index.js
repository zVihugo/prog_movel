import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CardItem } from '../CardItem/Index';
import { initializeFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase/config';

export function Card() {
  const [pesquisas, setPesquisas] = useState([]);

  useEffect(() => {
    const fetchPesquisas = async () => {
      try {
        const db = initializeFirestore(app, { experimentalForceLongPolling: true });
        const querySnapshot = await getDocs(collection(db, 'pesquisas'));
        const pesquisasList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPesquisas(pesquisasList);
      } catch (error) {
        console.error('Erro ao buscar as pesquisas:', error);
      }
    };

    fetchPesquisas();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.card}>
      {pesquisas.map((pesquisa) => (
        <CardItem
          key={pesquisa.id}
          nome={pesquisa.nome}
          date={pesquisa.data}
          image={{ uri: `data:image/jpeg;base64,${pesquisa.imagemUri}` }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '90%',
    padding: 10,
  },
});
