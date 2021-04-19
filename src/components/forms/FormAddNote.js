import React, { useState } from 'react';
import { StyleSheet, Pressable, Text, Modal, View, TextInput, Alert } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

function FormAddNote(props) {
    const [ formActive, setFormActive ] = useState(false);
    const [ noteTitle, setNoteTitle ] = useState('');
    const [ noteText, setNoteText ] = useState('');
    
    function sendNote() {
        if (noteTitle.trim() !== '' && noteText.trim() !== '') {
            const obj = {
                isNote: true,
                name: noteTitle,
                content: noteText  
            }
            props.noteCreator({
                isNote: true,
                name: noteTitle,
                content: noteText  
            })
        } else {
            Alert.alert(
                "Preencha os Campos",
                "Todos os campos são obrigatórios, Você poderá auterá-los sempre que quiser"
            )
        }
    }

    return (
        <Pressable onPress={() => {setFormActive(true)}} style={styles.importDocumentButton} android_ripple={{color: "#1db954"}}>
            <Text style={styles.importButtonDocumentText}>ADICIONAR NOTA</Text>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={formActive}
                onRequestClose={() => {setFormActive(false)}}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.labelText}>Título: </Text>
                    <TextInput onChangeText={text => {setNoteTitle(text)}}  style={styles.textInput} />
                    <Text style={styles.labelText}>Texto: </Text>
                    <TextInput onChangeText={text => {setNoteText(text)}} multiline={true} style={styles.textInputHuge} />

                    <View style={styles.buttonsContainer}>
                        <Pressable onPress={sendNote} style={styles.saveNoteButton} android_ripple={{color: "#1db954"}}>
                            <Entypo name="add-to-list" size={20} color="#aaa"/>
                            <Text style={{color: "#aaa", marginLeft: 10}}>ADICIONAR</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#383838',
        marginTop: 120,
        height: '100%',
        borderRadius: 15,
        borderColor: '#1db954',
        borderWidth: 2
    },
    labelText: {
        color: "#1db954",
        fontSize: 20,
        margin: 10
    },
    textInput: {
        margin: 10,
        backgroundColor: '#4a4a4a',
        borderRadius: 3,
        height: 32,
        fontSize: 13,
        color: "#1db954",
        borderBottomWidth: 1,
        borderBottomColor: '#1db954'
    },
    textInputHuge: {
        margin: 10,
        backgroundColor: '#4a4a4a',
        borderRadius: 3,
        height: 120,
        fontSize: 15,
        color: "#1db954",
        borderBottomWidth: 1,
        borderBottomColor: '#1db954'
    },
    importDocumentButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderColor: "#1db954",
        borderWidth: 2,
        width: 240,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveNoteButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderColor: "#1db954",
        borderWidth: 2,
        width: 240,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    importButtonDocumentText: {
        color: "#1db954",
    },
})

export default FormAddNote;