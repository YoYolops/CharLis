import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Modal, Text } from 'react-native';

// exibe um botão que, quando clicado, mostra um Modal

function NoteInteractor(props) {
    const [ showNoteInfo, setShowNoteInfo ] = useState(false)

    return (
        <Pressable onPress={() => {setShowNoteInfo(true)}} style={styles.noteInteractorContainer} android_ripple={{color: "#1db954", borderless: true}}>
            <Text>{props.name}</Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showNoteInfo}
                onRequestClose={() => {setInfoModeActive(false)}}
            >
                <View style={styles.modalContainer}>

                </View>

            </Modal>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    noteInteractorContainer: {

    },
    modalContainer: {
        backgroundColor: '#383838',
        marginTop: 120,
        height: '100%',
        borderRadius: 15,
        borderColor: '#1db954',
        borderWidth: 2
    },
})

export default NoteInteractor;