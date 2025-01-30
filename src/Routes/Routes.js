import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '../Pages/Login/Index';
import {createStackNavigator} from '@react-navigation/stack';
import {NovaConta} from '../Pages/NovaConta/Index';
import {RecuperarSenha} from '../Pages/RecuperarSenha/Index';
import {Home} from '../Pages/Home/Index';
import {DrawerNavigator} from '../Pages/DrawerNavigator/Index';
import {NovaPesquisa} from '../Pages/NovaPesquisa/NovaPesquisa';
import {AcoesPesquisa} from '../Pages/AcoesPesquisa';
import {ColetaDados} from '../Pages/ColetaDados';
import { Relatorio } from '../Pages/Relatório/Index';
import {ModificarPesquisa} from '../Pages/ModificarPesquisa/ModificarPesquisa';
import { Agradecimento } from '../Pages/Agradecimento';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export function Routes() {

  return (
   <Provider store={store}>
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NovaConta"
          component={NovaConta}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2B1D62',
            },
            title: 'Nova Conta',
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2B1D62',
            },
            title: 'Recuperar Senha',
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name="NovaPesquisa"
          component={NovaPesquisa}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2B1D62',
            },
            title: 'Nova Pesquisa',
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name="ModificarPesquisa"
          component={ModificarPesquisa}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2B1D62',
            },
            title: 'Modificar Pesquisa',
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name="AcoesPesquisa"
          component={AcoesPesquisa}
          options={({ route }) => {
            return {
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#2B1D62',
              },
              title: route.params?.pesquisaNome || 'Ações da Pesquisa',
              headerTitleStyle: {
                fontFamily: 'AveriaLibre-Bold',
                fontSize: 30,
              },
            };
          }}
        />
        <Stack.Screen
          name="ColetaDados"
          component={ColetaDados}
          options={{
            title: 'ColetaDados',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Relatorio"
          component={Relatorio}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2B1D62',
            },
            title: 'Relatório',
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold',
              fontSize: 30,
            },
          }}
          />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            title: 'Drawer',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Agradecimento"
          component={Agradecimento}
          options={{
            title: 'Agradecimento',
            headerShown: false,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  );
}
