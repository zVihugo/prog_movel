import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Card} from '../../components/Card/Index';
import {useState} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

export function Home({navigation}) {
  const [search, setSearch] = useState('');

  const goToNewResearch = () => {
    navigation.navigate('NovaPesquisa');
  };

  const goToActionSearch = () => {
    navigation.navigate('AcoesPesquisa');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputText}>
        <Icon style={styles.icon} name="search" color={'#8B8B8B'} size={25} />
        <TextInput
          style={styles.search}
          placeholder="Insira o termo de busca..."
          placeholderTextColor={'#8B8B8B'}
          value={search}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <ScrollView horizontal={true}>
        <TouchableOpacity
          style={{alignItems: 'center', paddingHorizontal: 30}}
          onPress={goToActionSearch}>
          <Card />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToNewResearch}>
          <Text style={styles.textButton}>NOVA PESQUISA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#372775',
  },
  icon: {
    marginLeft: 15,
  },
  inputText: {
    marginTop: 25,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
  },
  search: {
    backgroundColor: '#fff',
    flex: 1,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
  },
  cardButton: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    backgroundColor: '#37BD6D',
    justifyContent: 'center',
    width: '90%',
    height: 45,
    marginBottom: 25,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 28,
  },
});
