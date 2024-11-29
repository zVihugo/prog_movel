import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";

export function Agradecimento({ navigation }) {
    useEffect(() => {
        const mudar = setTimeout(() => {
            navigation.navigate('ColetaDados');
        }, 3000)

        return () => clearTimeout(mudar)
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Obrigado por participar da pesquisa!</Text>
            <Text style={styles.text}>Aguardamos você no próximo ano!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#372775',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: '#fff',
        fontSize: 24, 
       
        fontFamily: 'AveriaLibre-Regular',
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 24, 
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',
    },
});
