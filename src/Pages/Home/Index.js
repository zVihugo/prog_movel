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
import { db } from '../../firebase/config';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { Card } from '../../components/Card/Index';

export function Home({ navigation }) {
  const [pesquisas, setPesquisas] = useState([]);
  const [search, setSearch] = useState('');
  const [allPesquisas, setAllPesquisas] = useState([]);

  useEffect(() => {
    const fetchPesquisas = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'pesquisas'), orderBy('data', 'asc')));
        const pesquisasList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sorted = pesquisasList.sort((a, b) => {
          const dateA = convertStringToDate(a.data);
          const dateB = convertStringToDate(b.data);
          return dateA - dateB;
        });
        setAllPesquisas(sorted);
        setPesquisas(sorted);
      } catch (error) {
        console.error('Erro ao buscar as pesquisas:', error);
      }
    };
    fetchPesquisas();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = allPesquisas.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase())
      );
      setPesquisas(filtered);
    } else {
      setPesquisas(allPesquisas);
    }
  }, [search, allPesquisas]);

  const convertStringToDate = (dateString) => {
    try {
      if (!dateString || typeof dateString !== 'string') {
        console.warn('Invalid date string:', dateString);
        return new Date(0); 
      }
      
      const [month, day, year] = dateString.split('/');
      return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    } catch (error) {
      console.error('Error converting date:', error);
      return new Date(0); 
    }
  };

  const handleCardPress = (pesquisaId, pesquisaNome) => {
    navigation.navigate('AcoesPesquisa', { 
      pesquisaId,
      pesquisaNome
     });
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
        {pesquisas.map((pesquisa) => (
          <TouchableOpacity 
            style={styles.cardWrapper}
            onPress={() => handleCardPress(pesquisa.id, pesquisa.nome)}
          >
            <Card key={pesquisa.id} pesquisa={pesquisa} />
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
  search: {
    flex: 1,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#8B8B8B',
  },
  horizontalScroll: {
    marginVertical: 15,
  },
  cardsContainer: {
    paddingRight: 20,
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
