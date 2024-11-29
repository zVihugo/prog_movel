import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from '../../components/CustomDrawer/Index';
import {Home} from '../Home/Index';
import {Text, TouchableOpacity, View} from 'react-native';
import { useEffect } from 'react';

import IconMenu from 'react-native-vector-icons/Ionicons';
import IconFile from 'react-native-vector-icons/Fontisto';

const Drawer = createDrawerNavigator();

const CustomMenuIcon = ({navigation}) => (
  <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
    <IconMenu
      name="menu-sharp"
      size={55}
      color="#fff"
      style={{marginLeft: 10}}
    />
  </TouchableOpacity>
);

export function DrawerNavigator({navigation}) {

  

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {
          color: '#fff',
          fontFamily: 'AveriaLibre-Regular',
        },
        headerStyle: {
          backgroundColor: '#2B1D62',
        },
        drawerStyle: {
          backgroundColor: '#2B1F5C',
        },
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
      }}
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerTitle: '',
          drawerLabel: () => null,
          headerLeft: () => <CustomMenuIcon navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="pesquisa"
        component={Home}
        options={({navigation}) => ({
          headerTitle: '',
          drawerLabel: () => null,
          headerLeft: () => <CustomMenuIcon navigation={navigation} />,
          drawerIcon: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconFile name="file-1" color={'#fff'} size={25} />
              <Text
                style={{
                  fontFamily: 'AveriaLibre-Regular',
                  fontSize: 25,
                  color: '#fff',
                  marginLeft: 10,
                }}>
                Pesquisas
              </Text>
            </View>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}
