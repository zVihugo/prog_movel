import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useState} from 'react';

export function RecuperarSenha({navigation}) {
  const [email, setEmail ] = useState('');
  const [message, setErrorMessage] = useState('');
 

  const handleRecuperarSenha = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('E-mail parece ser inválido');
    } else {
      setErrorMessage('');
    
      navigation.navigate('Login');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.textContent}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.inputContext}
            placeholder="Digite seu e-mail"
          />
        </View>
        {message ? <Text style={styles.errorText}>{message}</Text> : null}
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={handleRecuperarSenha}>
          <Text style={styles.buttonText}>RECUPERAR</Text>
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
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 50,
  },
  TitleText: {
    color: '#fff',
    fontSize: 35,
    paddingLeft: '1%',
    fontFamily: 'AveriaLibre-Bold',
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
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
    color: '#3F92C5',
  },
  buttonContent: {
    backgroundColor: '#37BD6D',
    width: '80%',
    height: 40,
    fontFamily: 'AveriaLibre-Regular',
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 30,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  buttonHelp: {
    paddingTop: 30,
    fontFamily: 'AveriaLibre-Regular',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  buttonRegister: {
    backgroundColor: '#419ED7',
    width: '80%',
    height: 30,
    paddingLeft: 10,
    marginBottom: 10,
    padding: 8,
  },
  helpText: {
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  buttonChangePassword: {
    backgroundColor: '#B0CCDE',
    width: '80%',
    height: 30,
    paddingLeft: 10,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 14,
    fontFamily: "AveriaLibre-Regular",
    alignSelf: "flex-start",
    paddingLeft: 40,
    marginTop: 1,
  },
});
