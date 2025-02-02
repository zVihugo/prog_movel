import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

export function Relatorio() {
    const staticData = [
        { key: 1, name: 'Excelente', population: 40, color: '#FFD700' },
        { key: 2, name: 'Bom', population: 30, color: '#4682B4' },
        { key: 3, name: 'Neutro', population: 75, color: '#32CD32' },
        { key: 4, name: 'Ruim', population: 10, color: '#FF6347' },
        { key: 5, name: 'Péssimo', population: 5, color: '#40E0D0' },
    ];

    const [data, setData] = useState([]);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        const processData = (data) => {
            const totalPopulation = data.reduce((sum, item) => sum + item.population, 0);

            const proportionalData = data.map(item => ({
                ...item,
                value: (item.population / totalPopulation) * 100,
            }));

            const predominantItem = proportionalData.reduce((prev, current) => 
                (prev.value > current.value) ? prev : current
            );

            const finalData = proportionalData.map(item => ({
                ...item,
                svg: {
                    fill: item.color,
                },
                arc: {
                    ...(item.key === predominantItem.key ? { outerRadius: '120%', cornerRadius: 10 } : {}), // Destaca a fatia predominante
                }
            }));

            return finalData;
        };

        const processedData = processData(staticData);
        setData(processedData);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <PieChart
                    style={{ height: 250, width: screenWidth * 0.5 }}
                    data={data}
                    innerRadius={0} 
                    outerRadius={'70%'} 
                    padAngle={0.02} 
                />

                <View style={styles.legendContainer}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View
                                style={[styles.legendColor, { backgroundColor: item.color }]}
                            />
                            <Text style={styles.legendText}>{item.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#372775',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendContainer: {
        marginLeft: 20,
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
        borderRadius: 5,
        marginRight: 10,
    },
    legendText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'AveriaLibre-Regular',
    },
});