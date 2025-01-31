import { useState, useEffect } from 'react';
import { 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from '../../components/Card/Index';

import { useSelector, useDispatch } from 'react-redux';
import { getAllPesquisas } from '../../store/fetchActions'

export function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const pesquisas = useSelector((state) => state.pesquisas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPesquisas());
  }, [dispatch]);

  const filterPesquisa = pesquisas.filter(item => item.nome.toLowerCase().includes(search.toLowerCase()));
  
  const handleCardPress = (pesquisaId, pesquisaNome) => {
    const pesquisaExiste = pesquisas.find(item => item.id === pesquisaId);
    if (pesquisaExiste) {
      navigation.navigate('AcoesPesquisa', { 
        pesquisaId,
        pesquisaNome
      });
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
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

      <ScrollView
        horizontal
        style={styles.horizontalScroll}
        contentContainerStyle={styles.cardsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {filterPesquisa.map((pesquisa) => (
          <TouchableOpacity
            key={pesquisa.id} 
            style={styles.cardWrapper}
            onPress={() => handleCardPress(pesquisa.id, pesquisa.nome)}
          >
            <Card pesquisa={pesquisa} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.newResearchButton}
        onPress={() => navigation.navigate('NovaPesquisa')}
      >
        <Text style={styles.textButton}>NOVA PESQUISA</Text>
      </TouchableOpacity>
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
  icon: {
    paddingHorizontal: 10
  },
  search: {
    flex: 1,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
    paddingHorizontal: 5,
    color: '#8B8B8B',
  },
  horizontalScroll: {
    marginVertical: 15,
  },
  cardsContainer: {
    paddingRight: 10,
  },
  cardWrapper: {
    width: 170,
    height: 210,
    marginRight: 15,
  },
  newResearchButton: {
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