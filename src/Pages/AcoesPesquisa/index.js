import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function AcoesPesquisa({navigation, route}) { 
  const { pesquisaId } = route.params;

  const handleModificarPage = () => {
    navigation.navigate('ModificarPesquisa', { pesquisaId });
  };

  const handleColetaDadosPage = () => {
    navigation.navigate('ColetaDados', { pesquisaId });
  };

  const handleRelatorioPage = () => {
    navigation.navigate('Relatorio', { pesquisaId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleModificarPage}>
          <Icon name="pencil" size={50} color="#fff" />
          <Text style={styles.buttonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleColetaDadosPage}>
          <Icon name="clipboard-check" size={50} color="#fff" />
          <Text style={styles.buttonText}>Coletar dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRelatorioPage}>
          <Icon name="chart-pie" size={50} color="#fff" />
          <Text style={styles.buttonText}>Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    padding: 20,
    height: 100,
  },
  buttonContainer: {
    header: 80,
    paddingTop: '10',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#2B1D62',
    width: '28%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 8,
  },
});
