import React, { useState, useContext } from 'react';
import { StyleSheet, View, Pressable, Modal, Text, TextInput } from 'react-native';

import DisciplinasContext from '../context/DisciplinasContext';
import Feather from 'react-native-vector-icons/Feather';

// exibe um botão que, quando clicado, mostra um Modal

function NoteInteractor(props) {
    const { colors } = useContext(DisciplinasContext) 
    const [ showNoteInfo, setShowNoteInfo ] = useState(false);
    const [ allowEdit, setAllowEdit ] = useState(false);
    const [ editedTitle, setEditedTitle ] = useState(props.title);
    const [ editedContent, setEditedContent ] = useState(props.texto)
    const [ changed, setChanged ] = useState(false);

    function sendUpdate() {
        const newNote = {
            isNote: true,
            name: editedTitle,
            content: editedContent
        }
        console.log(newNote)
        props.updateNote(newNote, props.index)
        setShowNoteInfo(false)
    }

    return (
        <Pressable onPress={() => {setShowNoteInfo(true)}} style={styles.noteInteractorContainer} android_ripple={{color: "#1db954"}}>
            <Text style={styles.noteTitle}>{props.title}</Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showNoteInfo}
                onRequestClose={() => {setShowNoteInfo(false)}}
            >
                <View style={styles.modalContentContainer}>
                    <View style={styles.editableSlot} >
                        <TextInput
                            style={styles.textInput}
                            editable={allowEdit}
                            defaultValue={props.title}
                            multiline={true}
                            onChangeText={text => {
                                if (!changed) {
                                    setChanged(true)
                                }
                                setEditedTitle(text)
                            }}
                        />
                        <Pressable onPress={() => {setAllowEdit(!allowEdit)}} android_ripple={{color: allowEdit ? colors.greenDefault : colors.redDefault}} style={{marginRight: 10 }}>
                            <Feather name="edit" size={24} style={{color: allowEdit ? colors.greenDefault : colors.redDefault}} />
                        </Pressable>
                    </View>
                    <View>
                        <Text style={styles.labelText}>Nota: </Text>
                    </View>
                    <TextInput
                        style={styles.textInputHuge}
                        editable={allowEdit}
                        defaultValue={props.texto}
                        multiline={true}
                        onChangeText={text => {
                            if (!changed) {
                                setChanged(true)
                            }
                            setEditedContent(text)
                        }}
                    />
                    <View style={changed ? styles.saveButtonContainer : {display: 'none'}}>
                        <Pressable onPress={sendUpdate} disabled={!changed} android_ripple={{color: colors.greenDefault}} style={styles.saveButton}>
                            <Text style={{color: "#1db954"}}>SALVAR</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    noteInteractorContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        height: 46,
    },
    noteTitle: {
        color: '#ddd'
    },
    editableSlot: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#1db954',
        borderRadius: 5,
        backgroundColor: '#4a4a4a',
        alignItems: 'center'
    },
    modalContentContainer: {
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
        borderRadius: 3,
        minHeight: 48,
        width: '80%',
        fontSize: 18,
        color: "#1db954",
    },
    textInputHuge: {
        margin: 10,
        backgroundColor: '#4a4a4a',
        borderRadius: 3,
        height: 200,
        fontSize: 15,
        color: "#1db954",
        borderBottomWidth: 1,
        borderBottomColor: '#1db954'
    },
    saveButtonContainer: {
        margin: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButton: {
        borderRadius: 5,
        borderColor: "#1db954",
        borderWidth: 2,
        width: 240,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default NoteInteractor;