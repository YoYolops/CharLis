import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import DisciplinasContext from '../components/context/DisciplinasContext';

function DisciplinasTemplate({ route }) {
    const { title, horario } = route.params

    return (
        <ScrollView>
            <View style={styles.horarioContainer}>
                <Text style={styles.horarioHeader}>Horário: </Text>
                <View style={styles.horarioContent}>
                    {
                        horario.map(dia => {
                            return (
                                <View>
                                    <Text>{dia.dia}</Text>
                                    <Text>{`${dia.inicio} - ${dia.fim}`}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
    )    
};
                                   
const styles = StyleSheet.create({

})

export default DisciplinasTemplate;