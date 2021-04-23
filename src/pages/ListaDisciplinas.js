import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import RemovalBox from '../components/RemovalBox/RemovalBox';
import DisciplinasContext from '../components/context/DisciplinasContext'
import Footer from '../components/footer';

function ListaDisciplinas({ navigation }) {
    const { disciplinas, colors, darkModeActive, removeDisciplina } = useContext(DisciplinasContext)
    const [ removalModeActive, setRemovalModeActive ] = useState(false) //estado compartilhado com o footer
    const [ removalList, setRemovalList ] = useState([])

    function removalModeHandler(listaRemocao) { //função compartilhada com o footer
        // Função responsável por organizar as disciplinas que o usuário quer deletar em uma lista
        // e enviá-la ao método >removeDisciplina< do context
        if (removalModeActive && listaRemocao.length !== 0) {
            removeDisciplina(listaRemocao)
            setRemovalList([])
        }
        //setRemovalList([])
        setRemovalModeActive(!removalModeActive)
    }

    function interruptRemovalMode() {
        // Caso o modo de remoção de disciplinas seja interrompido, ess função é usada para garantir que 
        // que nenhum efeito colateral passe adiante
        if (removalModeActive) {
            setRemovalList([])
            setRemovalModeActive(false)
        }
    }

    function addRemovalItem(index) {
        // Adiciona uma disciplina à lista de disciplinas que serão excluídas

        let newArrayRemoval = Array.from(removalList)
        newArrayRemoval.push(index)
        //console.log(newArrayRemoval)
        setRemovalList(newArrayRemoval.sort((a,b) => a-b))
    }

    function removeRemovalItem(index) {
        // remove uma disciplina da lista de disciplinas que serão excluídas

        let newArrayRemoval = Array.from(removalList)
        newArrayRemoval.splice(newArrayRemoval.indexOf(index), 1)
        setRemovalList(newArrayRemoval)
    }

    return (
        <>
            <ScrollView style={[
                {
                    backgroundColor: darkModeActive ? colors.blackDefault : colors.lightDefault
                },
                styles.containerDisciplinas
            ]}>
                {disciplinas.map((disciplina, index) => {
                    return (
                        <Pressable key={index.toString() + disciplina.name} style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                ? 'rgba(29, 185, 84, 0.5)'
                                : darkModeActive ? colors.blackDefault : colors.lightDefault,
                            },
                            darkModeActive ? styles.disciplinaCadastradaDark : styles.disciplinaCadastradaLight
                        ]}
                        onPress={() => {
                            removalModeActive ? interruptRemovalMode(false) : void(0)
                            navigation.navigate("DisciplinaTemplate", {
                                title: disciplina.nome,
                                horario: disciplina.horario,
                                key: index
                        })}}>
                            <Text style={styles.nomeDisciplina}>{disciplina.nome}</Text>
                            <View style={styles.horarioDisciplinaContainer}>{disciplina.horario.map( dia => {
                                return (
                                    <View key={dia.dia} style={styles.horarioDisciplina }>
                                        <Text style={removalModeActive ? {display: 'none'} : {color: '#1db954'}}>{dia.dia}</Text>
                                    </View>
                                )
                            })}
                            </View>
                            <View style={{
                                display: removalModeActive ? 'flex' : 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <RemovalBox 
                                    addRemovalItem={() => {addRemovalItem(index)}}
                                    removeRemovalItem={() => {removeRemovalItem(index)}}
                                    removalModeActive={removalModeActive}
                                    interruptRemovalMode={() => {interruptRemovalMode()}}
                                    hitSlop={64}
                                    size={28}
                                    ico={1}
                                />
                            </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
            <Footer interruptRemovalMode={interruptRemovalMode} removalModeActive={removalModeActive} removalModeHandler={() => removalModeHandler(removalList)} navegacao={navigation}/>
        </>
    )
}

const styles = StyleSheet.create({
    invisible: {
        display: 'none'
    },
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

export default ListaDisciplinas;