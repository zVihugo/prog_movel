import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export function Relatorio() {
    const data = [
        { name: 'Excelente', population: 40, color: '#FFD700', legendFontColor: '#fff', legendFontSize: 14 },
        { name: 'Bom', population: 30, color: '#4682B4', legendFontColor: '#fff', legendFontSize: 14 },
        { name: 'Neutro', population: 15, color: '#32CD32', legendFontColor: '#fff', legendFontSize: 14 },
        { name: 'Ruim', population: 10, color: '#FF6347', legendFontColor: '#fff', legendFontSize: 14 },
        { name: 'Péssimo', population: 5, color: '#40E0D0', legendFontColor: '#fff', legendFontSize: 14 },
    ];

    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
     
            <View style={styles.row}>
              
                <PieChart
                    data={data}
                    width={screenWidth * 0.5} 
                    height={250}
                    chartConfig={{
                        backgroundColor: '#1e2923',
                        backgroundGradientFrom: '#1e2923',
                        backgroundGradientTo: '#08130d',
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="50"
                    absolute
                    hasLegend={false} 
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
