import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { addNewPesquisa } from '../../store/fetchActions';

export function NovaPesquisa({ navigation }) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imagemUri, setImagemUri] = useState(null);
  const [nomeError, setNomeError] = useState('');
  const [dataError, setDataError] = useState('');
  const dispatch = useDispatch();

  const convertUriToBase64 = async (uri) => {
    try {
      const manipulatedImage = await manipulateAsync(
        uri,
        [{ resize: { width: 150 } }],
        { compress: 0.1, format: SaveFormat.JPEG },
      );

      const base64 = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setImagemUri(base64);
    } catch (error) {
      console.error('Erro ao manipular e converter a imagem:', error);
    }
  };

  const handleEscolherImagem = async () => {
    Alert.alert('Selecionar Imagem', 'Escolha a fonte da imagem:', [
      {
        text: 'Câmera',
        onPress: async () => {
          const cameraPermission =
            await ImagePicker.requestCameraPermissionsAsync();
          if (!cameraPermission.granted) {
            alert('Permissão para acessar a câmera é necessária!');
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled) {
            convertUriToBase64(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Galeria',
        onPress: async () => {
          const galleryPermission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!galleryPermission.granted) {
            alert('Permissão para acessar a galeria é necessária!');
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled) {
            convertUriToBase64(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setData(date.toLocaleDateString());
      setDataError('');
    }
  };

  const handleCadastro = () => {
    let valid = true;

    if (!nome.trim()) {
      setNomeError('O campo Nome é obrigatório.');
      valid = false;
    } else {
      setNomeError('');
    }

    if (!data.trim()) {
      setDataError('O campo Data é obrigatório.');
      valid = false;
    } else {
      setDataError('');
    }

    if (valid) {  
      const doc = {
        nome: nome,
        data: data,
        imagemUri: imagemUri,
      };
      dispatch(addNewPesquisa(doc));
      navigation.navigate('Drawer');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.textContent}>Nome</Text>
          <TextInput
            style={styles.inputContext}
            value={nome}
            onChangeText={(text) => {
              setNome(text);
              setNomeError('');
            }}
          />
          {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textContent}>Data</Text>
          <View style={styles.dateInputWrapper}>
            <TextInput
              style={[styles.inputContext, { flex: 1 }]}
              value={data}
              editable={false}
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.iconWrapper}
            >
              <Icon name="calendar" size={20} color="#939393" />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={'default'}
              onChange={handleDateChange}
            />
          )}
          {dataError ? <Text style={styles.errorText}>{dataError}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textContent}>Imagem</Text>
          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={handleEscolherImagem}
            >
              <Text style={styles.buttonText}>Câmera/Galeria de imagens</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonContent} onPress={handleCadastro}>
          <Text style={styles.buttonText2}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputGroup: {
    width: '80%',
    marginBottom: 10,
  },
  textContent: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    marginBottom: 5,
    textAlign: 'left',
  },
  inputContext: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    paddingLeft: 10,
    justifyContent: 'center',

    fontFamily: 'AveriaLibre-Regular',
    color: '#3F92C5',
    fontSize: 16,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',

    height: 40,
  },
  iconWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageButton: {
    backgroundColor: '#fff',
    padding: 25,
    color: '#000',
  },
  buttonContent: {
    backgroundColor: '#37BD6D',
    width: '80%',
    height: 40,
    marginTop: 30,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#939393',
    fontSize: 14,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  buttonText2: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  errorText: {
    color: '#FD7979',
    fontSize: 14,
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 5,
  },
});
