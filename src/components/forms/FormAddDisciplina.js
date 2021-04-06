import React, { useContext, useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

import DisciplinasContext from '../context/DisciplinasContext';
import FormAddDia from './FormAddDia';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

function FormAddDisciplina() {
    const { darkModeActive, colors } = useContext(DisciplinasContext)

    const [ nome, setNome ] = useState(null);

    const [ dias, setDias ] = useState([<FormAddDia />]) /* pra cada elemento dessa lista, um dia de cadastro será criado */
    function addDia() {
        let novoArray = Array.from(dias)
        novoArray.push(<FormAddDia key={novoArray.length} />)
        setDias(novoArray)
    }

    return (
        <ScrollView style={[
                {
                    backgroundColor: darkModeActive ? "#191919" : "#fff"
                },
                styles.formAddDisiplinaContainer]}>
            <Text style={[
                {
                    color: darkModeActive ? "rgb(29, 185, 84)" : "#191919"
                }
                ,styles.labelInput]}
            >
                Nome da Disciplina:
            </Text>
            <TextInput
                style={[
                    {
                        color: darkModeActive ? colors.greenDefault : colors.blackDefault
                    },
                    styles.input]}
                onChangeText={text => setNome(text)}
            >
            </TextInput>
            <View style={styles.blocoHorarios}>
                {
                    dias.map(formadddia => formadddia)
                }
                <Pressable onPress={addDia} style={styles.insertScheduleButton} android_ripple={{color: 'rgb(29, 185, 84)', radius: 0}}>
                    <Entypo name="add-to-list" size={20} />
                    <Text style={styles.insertScheduleButtonText}>Adicionar Dia</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formAddDisiplinaContainer: {
        display: 'flex',
        flex: 1,
        borderLeftWidth: 3,
        borderLeftColor: 'rgb(29, 185, 84)',
    },
    labelInput: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 16,
    },
    input: {
        margin: 10,
        marginBottom: 15,
        marginTop: 0,
        height: 40,
        borderBottomWidth: 2,
        borderColor: 'rgb(29, 185, 84)',
    },
    blocoHorarios: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    insertScheduleButton :{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 90,
        marginLeft: 90,
        borderWidth: 2,
        height: 32,
        borderColor: "rgb(29, 185, 84)",
        borderRadius: 5
    },
    insertScheduleButtonText: {
        marginLeft: 5
    }
})

export default FormAddDisciplina;