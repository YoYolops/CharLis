import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import DisciplinasContext from '../components/context/DisciplinasContext'
import AddButton from '../components/addButton';

function Disciplinas() {
    const { disciplinas } = useContext(DisciplinasContext)
    return (
        <>
            <ScrollView style={styles.containerDisciplinas}>
                {disciplinas.map(disciplina => {
                    return (
                        <Pressable key={disciplina.nome} style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                ? '#15d157'
                                : '#1db954'
                            },
                            styles.disciplinaCadastrada
                        ]
                        }>
                            <Text style={styles.nomeDisciplina}>{disciplina.nome}</Text>
                            <View style={styles.horarioDisciplinaContainer}>{disciplina.horario.map( dia => {
                                return (
                                    <Text style={styles.horarioDisciplina}>
                                        {dia.dia}
                                    </Text>
                                )
                            })}</View>
                        </Pressable>
                    )
                })}
            </ScrollView>
            <AddButton />
        </>
    )
}

const styles = StyleSheet.create({
    containerDisciplinas: {
        backgroundColor: '#191919',
        height: '100%',
    },
    disciplinaCadastrada: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginTop: 20,
        marginBottom: 2,
        height: 64,
        borderRadius: 5,
        justifyContent: 'space-between',
    },
    nomeDisciplina: {
        display: 'flex',
        margin: 10,
        fontSize: 20,
        color: '#fff'
    },
    horarioDisciplinaContainer: {
        margin: 10,
        right: 0,
    },
    horarioDisciplina: {
        color: '#fff'
    }
})

export default Disciplinas;