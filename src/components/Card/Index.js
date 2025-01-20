import {View, StyleSheet} from 'react-native';
import { CardItem } from '../CardItem/Index';

import Computer from '../../assets/images/Computer.png';
import People from '../../assets/images/People.png';
import Person from '../../assets/images/Person.png';
import { useSelector } from 'react-redux';

export function Card() {
  const nome = useSelector((state) => state.novaPesquisa.nome);
  const date = useSelector((state) => state.novaPesquisa.data);
  const imagemUri = useSelector((state) => state.novaPesquisa.imagemUri);
  return (
    <View style={Styles.card}>
      <CardItem nome="SECOMP 2023" date="10/10/2023" image={Computer} />
      <CardItem nome="UBUNTU 2022" date="05/06/2022" image={People} />
      <CardItem nome="MENINAS CPU" date="01/04/2022" image={Person} />
    </View>
  );
}

const Styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    width: '90%',
  },
});
