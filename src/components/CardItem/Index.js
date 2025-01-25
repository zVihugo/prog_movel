// CardItem.js
import { Image, Text, View, StyleSheet } from 'react-native';

export function CardItem({ nome, date, image }) {
  const safeDate = typeof date === 'string' ? date : 'Data não disponível';
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: `data:image/jpeg;base64,${image}` }} 
          style={styles.image} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.date}>{safeDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,  
    height: 200, 
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,  
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: '60%',  
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  nome: {
    fontSize: 18, 
    fontFamily: 'AveriaLibre-Regular',
    color: '#3F92C5',
    textAlign: 'center',
    lineHeight: 22, 
    maxHeight: 44,
  },
  date: {
    fontSize: 14, 
    color: '#8B8B8B',
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 6,
  },
});