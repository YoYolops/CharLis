import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Image, Modal } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import * as DocumentPicker from 'expo-document-picker';
import ImageViewer from 'react-native-image-zoom-viewer';

import DisciplinasContext from '../components/context/DisciplinasContext';

function DisciplinasTemplate({ route }) {
    const { horario, key } = route.params
    const { updateDisciplinas, disciplinas, darkModeActive, colors } = useContext(DisciplinasContext)
    const [ documents, setDocuments ] = useState(disciplinas[key].documentos)
    const [ files, setFiles ] = useState({images: [], documents: []})
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ modalInitialIndex, setModalInitialIndex ] = useState(0)

    function isImage(fileName) {
        //verifica se o nome do arquivo possui extenção de imagem, retorna true em caso afirmativo
        const lastro = ['.jpg', ".png", ".jpeg", ".bmp", ".gif", ".webp"]

        for (let i = 0; i < lastro.length; i++) {
            if (fileName.indexOf(lastro[i]) !== -1) {
                return true
            }
        } return false
    }

    useEffect(() => {
        // Cria a estrutura de dados necessária para renderização do image viwer
        let newImages = [];
        let newDocuments = []

        disciplinas[key].documentos.forEach(document => {
            if (isImage(document.name)) {
                newImages.push({
                    url: '',
                    width: 360,
                    height: 480,
                    props: {
                        source: {uri: document.uri},
                        resizeMode: 'contain'
                    }
                })
            } else {
                newDocuments.push(document)
            }
        })
        setFiles({images: newImages, documents: newDocuments})
        setDocuments(disciplinas[key].documentos)
    }, [disciplinas])


    async function pickDocumentHandler() {
        // abre o seletor de documentos e adiciona o URI do documento selecionado aos dados permanentes do app

        const documentInfo = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false
        })
        const documentData = {
            name: documentInfo.name,
            uri: documentInfo.uri
        }
        // caso o document picker seja fechado sem selecionar documento, documentData.uri é undefined
        // queremos evitar que documentos vazios sejam salvos para evitar que os métodos de exibição
        // quebrem, uma vez que não tem como exibir um documento undefined, por isso:
        if (!!documentData.uri) {
            const newDocumentsArray = Array.from(documents)
            newDocumentsArray.push(documentData)
            //console.log('array novo:')
            //console.log(newDocumentsArray)
            updateDisciplinas(key, newDocumentsArray)
        }
    }


    return (
        <ScrollView style={[
                {
                    backgroundColor: darkModeActive ? colors.blackDefault : '#ddd'
                },
                styles.disciplinasTemplateContainer
            ]}>
            <View style={styles.horarioContainer}>
                <Text style={styles.textHeader}>Horário: </Text>
                <View style={styles.horarioContent}>
                    {
                        horario.map(dia => {
                            return (
                                <View key={dia.dia} style={styles.blocoDia}>
                                    <Text style={[{color: darkModeActive ? '#ddd' : colors.blackDefault},styles.blocoDiaText]}>{dia.dia}</Text>
                                    <Text style={[{color: darkModeActive ? '#ddd' : colors.blackDefault},styles.blocoDiaText]}>{`${dia.inicio} - ${dia.fim}`}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={styles.imagesContainer}>
                <Text style={styles.textHeader}>Imagens: </Text>
                <View style={styles.staticImagesContent}>{
                    files.images.map((image, index) => {
                        return (
                            <Pressable style={styles.imageHolder} key={index} onPress={() => {
                                setModalInitialIndex(index)
                                setModalVisible(true)}}>
                                <Image style={styles.staticImages} source={image.props.source}/> 
                            </Pressable>
                        )
                    })
                }
                </View>
                <Modal visible={modalVisible} animationType='slide' presentationStyle='fullScreen'>
                    <ImageViewer index={modalInitialIndex} onCancel={() => {setModalVisible(false)}} enableSwipeDown={true} onSwipeDown={() => {setModalVisible(false)}} imageUrls={files.images}/>
                </Modal>
            </View>
            <View style={styles.documentsContainer}>
                <Text style={styles.textHeader}>Documentos: </Text>
                <View>
                    {
                        files.documents.map((document, index) => {
                            return (
                                <Pressable key={index} style={styles.documentPressable} onPress={ () => {
                                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                                        data: document.uri,
                                        flags: 1,
                                     });
                                }}>
                                    <Text style={[{color: darkModeActive ? '#ddd' : colors.blackDefault},styles.documentsTitles]}>{document.name}</Text>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={pickDocumentHandler} style={styles.importDocumentButton} android_ripple={{color: "#1db954"}}>
                    <Text style={styles.importButtonDocumentText}>IMPORTAR ARQUIVO</Text>
                </Pressable>
            </View>
        </ScrollView>
    )    
};
                                   
const styles = StyleSheet.create({
    disciplinasTemplateContainer: {
        borderLeftWidth: 3,
        borderLeftColor: "#1db954"
    },
    horarioContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "#1db954",
    },
    textHeader: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#1db954"
    },
    horarioContent: {
        margin: 10
    },
    imagesContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "#1db954"
    },
    imageHolder: {
        margin: 5,
        borderLeftWidth: 3,
        borderLeftColor: "#1db954",
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#1db954"
    },
    staticImagesContent: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        marginLeft: 20,
        marginRight: 20
    },
    staticImages: {
        width: 124,
        height: 124,
        borderRadius: 5,
    },
    blocoDia: {
        borderLeftColor: "#1db954",
        borderLeftWidth: 2,
        borderRadius: 5,
        marginBottom: 5
    },
    blocoDiaText: {
        marginLeft: 10,
        marginBottom: 2,
        fontSize: 14
    },
    documentPressable: {
        margin: 10,
        borderLeftWidth:2,
        borderLeftColor: "#1db954",
        borderRadius: 5,
        height: 46,
        justifyContent: 'center'
    },
    documentsTitles: {
        marginLeft: 10,
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