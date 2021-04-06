import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import DisciplinasContext from '../components/context/DisciplinasContext'
import Footer from '../components/footer';

function Disciplinas({ navigation }) {
    const { disciplinas, colors, darkModeActive } = useContext(DisciplinasContext)
    return (
        <>
            <ScrollView style={[
                {
                    backgroundColor: darkModeActive ? colors.blackDefault : colors.lightDefault
                },
                styles.containerDisciplinas
            ]}>
                {disciplinas.map(disciplina => {
                    return (
                        <Pressable key={disciplina.nome} style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                ? 'rgba(29, 185, 84, 0.5)'
                                : darkModeActive ? colors.blackDefault : colors.lightDefault,
                            },
                            darkModeActive ? styles.disciplinaCadastradaDark : styles.disciplinaCadastradaLight
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
            <Footer navegacao={navigation}/>
        </>
    )
}

const styles = StyleSheet.create({
    containerDisciplinas: {
        height: '100%',
    },
    disciplinaCadastradaDark: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginTop: 20,
        marginBottom: 2,
        height: 64,
        borderRadius: 5,
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: "rgb(29, 185, 84)"
    },
    disciplinaCadastradaLight: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginTop: 20,
        marginBottom: 2,
        height: 64,
        borderRadius: 5,
        justifyContent: 'space-between',
        borderLeftWidth: 3,
        borderLeftColor: "rgb(29, 185, 84)",
        borderBottomWidth: 1,
        borderBottomColor: "rgb(29, 185, 84)",
    },
    nomeDisciplina: {
        display: 'flex',
        margin: 10,
        fontSize: 20,
        color: '#1db954',

    },
    horarioDisciplinaContainer: {
        margin: 10,
        right: 0,
    },
    horarioDisciplina: {
        color: '#1db954'
    }
})

export default Disciplinas;