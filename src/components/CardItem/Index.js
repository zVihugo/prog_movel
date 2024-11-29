import {Image, Text, View, StyleSheet} from 'react-native';

export function CardItem({title, date, image}) {
  return (
    <View style={Styles.card}>
      <View style={Styles.imageContainer}>
        <Image source={image} style={Styles.image} />
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.title}>{title}</Text>
        <Text style={Styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    height: '50%',
    borderRadius: 10,
    elevation: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 15,
  },
  image: {
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontFamily: 'AveriaLibre-Regular',
    color: '#3F92C5',
    textAlign: 'center',
  },
  date: {
    marginTop: 5,
    fontSize: 16,
    color: '#8B8B8B',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
});
