import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { reducerSetNovaPesquisa } from '../../redux/novaPesquisaSlice';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export function ModificarPesquisa({ navigation }) {
  const [nome, setNome] = useState('Pesquisa Exemplo');
  const [data, setData] = useState('17/11/2024');
  const [imagemUri, setImagemUri] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nomeError, setNomeError] = useState('');
  const [dataError, setDataError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setData(date.toLocaleDateString());
      setDataError('');
    }
  };
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
  const handleSalvar = () => {
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
      console.log({ nome, data });
      dispatch(reducerSetNovaPesquisa({ nome: nome, data: data }));
      navigation.navigate('Home');
    }
  };

  const handleApagar = () => {
    console.log('Pesquisa apagada');
    setModalVisible(false);
    navigation.navigate('Drawer');
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
          <TouchableOpacity
            onPress={handleEscolherImagem}
            style={styles.iconContainer}
          >
            <Icon2 name={'party-popper'} size={50} color={'#C60EB3'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContent} onPress={handleSalvar}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deleteGroup}>
        <TouchableOpacity
          style={styles.trashIcon}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="trash" size={25} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.deleteText}>Apagar</Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tem certeza de apagar esta pesquisa?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleApagar}
              >
                <Text style={styles.modalButtonText}>SIM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputGroup: {
    width: '70%',
    marginBottom: 10,
  },
  textContent: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'AveriaLibre-Regular',
  },
  inputContext: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    paddingLeft: 10,

    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    color: '#3F92C5',
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
  iconContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  buttonContent: {
    backgroundColor: '#37BD6D',
    width: '70%',
    height: 40,
    marginTop: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 18,
  },
  deleteGroup: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,
  },
  trashIcon: {
    marginRight: 18,
  },
  deleteText: {
    color: '#FFF',
    fontSize: 18,
  },
  errorText: {
    color: '#FD7979',
    fontSize: 14,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2B1F5C',
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 18,
    marginBottom: 50,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#FF8383',
  },
  cancelButton: {
    backgroundColor: '#3F92C5',
  },
  modalButtonText: {
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
    fontSize: 20,
  },
});
