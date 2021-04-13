import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import DisciplinasContext from '../components/context/DisciplinasContext';
import { useEffect } from 'react';

function DisciplinasTemplate({ route }) {
    const { horario, key } = route.params
    const { updateDisciplinas, disciplinas } = useContext(DisciplinasContext)
    const [ documents, setDocuments ] = useState(disciplinas[key].documentos)

    useEffect(() => {
        setDocuments(disciplinas[key].documentos)
    }, [disciplinas])

    async function pickDocumentHandler() {
        const documentInfo = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false
        })
        const documentData = {
            name: documentInfo.name,
            uri: documentInfo.uri
        }
        const newDocumentsArray = Array.from(documents)
        newDocumentsArray.push(documentData)
        //console.log('array novo:')
        //console.log(newDocumentsArray)
        updateDisciplinas(key, newDocumentsArray)
    }

    return (
        <ScrollView style={styles.disciplinasTemplateContainer}>
            <View style={styles.horarioContainer}>
                <Text style={styles.horarioHeader}>Horário: </Text>
                <View style={styles.horarioContent}>
                    {
                        horario.map(dia => {
                            return (
                                <View key={dia.dia} style={styles.blocoDia}>
                                    <Text style={styles.blocoDiaText}>{dia.dia}</Text>
                                    <Text style={styles.blocoDiaText}>{`${dia.inicio} - ${dia.fim}`}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View>{
                documents.map((arquivo, index) => {
                    return (
                        <Text key={index}>{arquivo.name}</Text>
                    )
                })}
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={pickDocumentHandler} style={styles.importDocumentButton}>
                    <Text style={styles.importButtonDocumentText}>IMPORTAR DOCUMENTO</Text>
                </Pressable>
            </View>
        </ScrollView>
    )    
};
                                   
const styles = StyleSheet.create({
    disciplinasTemplateContainer: {
        backgroundColor: "#f2f2f2",
        borderLeftWidth: 3,
        borderLeftColor: "#1db954"
    },
    horarioContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "#1db954",
    },
    horarioHeader: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#1db954"
    },
    horarioContent: {
        margin: 10
    },
    blocoDia: {
        borderLeftColor: "#1db954",
        borderLeftWidth: 2,
        borderRadius: 5,
        marginBottom: 5
    },
    blocoDiaText: {
        marginLeft: 5,
        marginBottom: 2,
        fontSize: 14
    },
    buttonsContainer: {
        margin: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    importDocumentButton: {
        borderRadius: 5,
        borderColor: "#1db954",
        borderWidth: 2,
        width: 240,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    importButtonDocumentText: {
        color: "#1db954"
    },
})

export default DisciplinasTemplate;