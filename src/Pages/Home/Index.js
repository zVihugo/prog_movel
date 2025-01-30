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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCardPress(item.id)}
      style={styles.cardWrapper}
    >
      <CardItem
        nome={item.nome}
        date={item.data}
        image={item.imagemUri}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inputText}>
        {/* Search input */}
      </View>

      
      <ScrollView horizontal={true}>
        <TouchableOpacity
          style={{alignItems: 'center', paddingHorizontal: 10}}
          onPress={goToActionSearch}>
          <Card />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToNewResearch}>
          <Text style={styles.textButton}>NOVA PESQUISA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#372775',
    padding: 20,
    minHeight: Dimensions.get('window').height,
  },
  inputText: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 45,
    marginBottom: 15,
  },
  search: {
    flex: 1,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 15,
    backgroundColor: '#37BD6D',
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 20,
    width: '100%',
    elevation: 3,
  },
  textButton: {
    color: '#fff',
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
});
