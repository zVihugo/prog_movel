import { StyleSheet, ScrollView } from 'react-native';
import { CardItem } from '../CardItem/Index';

export function Card({ pesquisa }) {
  return (
    <ScrollView contentContainerStyle={styles.card}>
      <CardItem 
        key={pesquisa.id}
        nome={pesquisa.nome}
        date={pesquisa.data}
        image={pesquisa.imagemUri}
      />
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
