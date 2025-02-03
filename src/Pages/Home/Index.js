import { 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from '../../components/Card/Index';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPesquisas } from '../../store/fetchActions'

export function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState('');
  const pesquisas = useSelector((state) => state.pesquisas);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPesquisas = async () => {
      setLoading(true);
      try {
        await dispatch(getAllPesquisas());
      } catch (error) {
        console.error('Erro ao carregar pesquisas', error);
      } finally {
        setLoading(false);
      }
     }
    fetchPesquisas();
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
      {loading ? (
        <View style={styles.containerLogin}>
          <Text style={styles.loadingText}>Carregando pesquisas...</Text>
        </View>
      ) : (
        <>
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
        </>
      )}
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
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 30,
    color: '#FFF'
  },  
  inputText: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 45,
    marginBottom: 10,
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
    width: 200,
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