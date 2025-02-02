import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useFonts } from 'expo-font';
import {useState} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth_mod } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { addEmail } from '../../store/email/emailSlice';

export function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    'AveriaLibre-Regular': require('../../../assets/fonts/AveriaLibre-Regular.ttf'),
    'AveriaLibre-Bold': require('../../../assets/fonts/AveriaLibre-Bold.ttf'),
  });

  const handlePressNavigateRegister = () => {
    navigation.navigate('NovaConta');
  };

  const handlePressNavigateForgotPassword = () => {
    navigation.navigate('RecuperarSenha');
  };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('E-mail e/ou senha inválidos.');
    } else {
      setErrorMessage('');
      signInWithEmailAndPassword(auth_mod, email, password)
      .then(() => {
        dispatch(addEmail(email));
        navigation.navigate('Drawer');
      }).catch((error) => {
        console.error("Error: " + JSON.stringify(error));
        if(error.code === 'auth/user-not-found'){
          setErrorMessage('Usuário não encontrado.');
        } else if (error.code === 'auth/wrong-password'){
          setErrorMessage('Senha incorreta.');
        } else {
          setErrorMessage('Senha incorreta.');
        }
      })
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.TitleText}>Satisfying.you</Text>
        <Icon style={styles.icon} name="sentiment-satisfied" size={50} color="#fff" />
      </View>
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
        <View style={styles.inputGroup}>
          <Text style={styles.textContent}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={password => setPassword(password)}
            style={styles.inputContext}
            secureTextEntry={true}
            placeholder="Digite sua senha"
          />
          {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        
        <TouchableOpacity style={styles.buttonContent} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonHelp}>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={handlePressNavigateRegister}>
          <Text style={styles.helpText}>Criar minha conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonChangePassword}
          onPress={handlePressNavigateForgotPassword}>
          <Text style={styles.helpText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    justifyContent: 'space-between', 
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  title: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, 
  },
  TitleText: {
    color: '#fff',
    fontSize: 34,
    paddingLeft: '1%',
    fontFamily: 'AveriaLibre-Bold',
  },
  inputGroup: {
    width: '60%',
    marginBottom: 15,
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
    height: 35,
    paddingLeft: 10,
    paddingTop: 8,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 16,
    color: '#3F92C5',
    
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 14,
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 5, 
    alignSelf: 'flex-start',
  },
  
  buttonContent: {
    backgroundColor: '#37BD6D',
    width: '60%',
    height: 30, 
    justifyContent: 'center',
    marginTop: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  buttonHelp: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: '#419ED7',
    width: '60%',
    height: 30,
    justifyContent: 'center',

    marginBottom: 10,
  },
  helpText: {
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  buttonChangePassword: {
    backgroundColor: '#B0CCDE',
    width: '60%',
    height: 30,
    justifyContent: 'center',

  },
});
