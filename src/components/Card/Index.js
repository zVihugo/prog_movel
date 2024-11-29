import {View, StyleSheet} from 'react-native';
import { CardItem } from '../CardItem/Index';

import Computer from '../../assets/images/Computer.png';
import People from '../../assets/images/People.png';
import Person from '../../assets/images/Person.png';

export function Card() {
  return (
    <View style={Styles.card}>
      <CardItem title="SECOMP 2023" date="10/10/2023" image={Computer} />
      <CardItem title="UBUNTU 2022" date="05/06/2022" image={People} />
      <CardItem title="MENINAS CPU" date="01/04/2022" image={Person} />
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
