import React, { useContext, useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Button } from 'react-native';

import DisciplinasContext from '../context/DisciplinasContext';
import FormAddDia from './FormAddDia';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';

function FormAddDisciplina() {
    const { darkModeActive, colors, adicionarDisciplina } = useContext(DisciplinasContext)

    const [ nome, setNome ] = useState(null);
    const [ horario, setHorario ] = useState([]);
    function addHorario(data) {
        const novoArray = Array.from(horario)
        novoArray.push(data)
        setHorario(novoArray)
    }
    function removeHorario() {
        const novoArray = Array.from(horario)
        novoArray.splice(-1)
        setHorario(novoArray)
    }

    const [ dias, setDias ] = useState([<FormAddDia key={0} chave={0} adicionarHorario={addHorario} />]) /* pra cada elemento dessa lista, um dia de cadastro será criado */
    function addDia() {
        let novoArray = Array.from(dias)
        novoArray.push(<FormAddDia key={novoArray.length} chave={novoArray.length} adicionarHorario={addHorario} />)
        setDias(novoArray)
    }
    function removeDia() {
        let novoArray = Array.from(dias)
        novoArray.splice(dias.length - 1, 1)
        setDias(novoArray)
        removeHorario()
    }

    function setarDisciplina() {
        const jsonDaDisciplina = {
            nome,
            horario
        }
        adicionarDisciplina(jsonDaDisciplina)
    }

    return (
        <>
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
                    <View style={styles.scheduleButtonContainer}>
                        <Pressable onPress={removeDia} style={styles.removeScheduleButton} android_ripple={{color: 'rgb(29, 185, 84)', radius: 0}}>
                            <Entypo name="add-to-list" size={20} />
                            <Text style={styles.insertScheduleButtonText}>Remover Dia</Text>
                        </Pressable>
                        <Pressable onPress={addDia} style={styles.insertScheduleButton} android_ripple={{color: 'rgb(29, 185, 84)', radius: 0}}>
                            <Entypo name="add-to-list" size={20} />
                            <Text style={styles.insertScheduleButtonText}>Adicionar Dia</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <Button onPress={setarDisciplina} title="Cadastrar" color="rgb(29, 185, 84)" />
        </>
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
        marginBottom: 20,
    },
    scheduleButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    insertScheduleButton :{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10,
        borderWidth: 2,
        height: 32,
        width: 130,
        borderColor: "rgb(29, 185, 84)",
        borderRadius: 5
    },
    removeScheduleButton :{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10,
        borderWidth: 2,
        height: 32,
        width: 130,
        borderColor: "#b91d1d",
        borderRadius: 5
    },
    insertScheduleButtonText: {
        marginLeft: 5
    }
})

export default FormAddDisciplina;