import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export function Relatorio({ route }) {
    const { pesquisaId } = route.params;
    const [data, setData] = useState([]);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        const fetchVotos = async () => {
            try {
                const pesquisaRef = doc(db, 'pesquisas', pesquisaId);
                const pesquisaSnap = await getDoc(pesquisaRef);

                if (pesquisaSnap.exists()) {
                    const votos = pesquisaSnap.data().votos || {};
                    const formattedData = Object.keys(votos).map((key) => ({
                        value: votos[key], 
                        svg: { fill: getColorForKey(key) },
                        key: key, 
                    }));
                    setData(formattedData);
                }
            } catch (error) {
                console.error('Erro ao buscar votos:', error);
            }
        };

        fetchVotos();
    }, [pesquisaId]);

    const getColorForKey = (key) => {
        const colors = {
            'Excelente': '#F1CE7E',
            'Bom': '#6994FE',
            'Neutro': '#5FCDA4',
            'Ruim': '#EA7288',
            'Péssimo': '#53D8D8'
        };
        return colors[key] || '#ccc'; 
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <PieChart
                    style={{ height: 320, width: screenWidth * 0.5 }}
                    data={data}
                    innerRadius={0}
                    outerRadius={'70%'}
                    padAngle={0.02}
                />
                <View style={styles.legendContainer}>
                    {data.length > 0 ? data.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View
                                style={[styles.legendColor, { backgroundColor: item.svg.fill }]} 
                            />
                            <Text style={styles.legendText}>{item.key}</Text>
                        </View>
                    )) : ( 
                        <View style={styles.containerText}>
                            <Text style={styles.text}>Sem avaliações por enquanto</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#372775',
        padding: 20 ,
        justifyContent: 'center',
        alignItems: 'center',
         fontFamily: 'AveriaLibre-Regular',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendContainer: {
        marginLeft: 50,
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    legendColor: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    legendText: {
        color: '#FFF',
        fontSize: 18,
    },
    containerText:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 275
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center'
    }
});
