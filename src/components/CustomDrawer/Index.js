import {View, Text, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/Octicons';

export function CustomDrawer(props) {

  const email = useSelector((state) => state.email);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.userText}>{email}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.drawerItem}>
          <DrawerItemList {...props} />
        </View>
        <View style={styles.signOut}>
          <DrawerItem
            label="Sair"
            labelStyle={{
              color: '#fff',
              fontSize: 25,
              fontFamily: 'AveriaLibre-Regular',
            }}
            icon={({color, size}) => (
              <Icon name="sign-out" color="#fff" size={25} />
            )}
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerText: {
    paddingVertical: 20,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    width: '85%',
    marginLeft: 25,
  },
  userText: {
    fontSize: 30,
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 15,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  drawerItem: {
    flex: 1,
  },
});
