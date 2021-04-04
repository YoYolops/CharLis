import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

function Footer(props) {
    return (
        <View style={styles.footerContainer}>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed
                    ? '#15d157'
                    : '#1db954'
                },
                styles.addIconContainer
            ]
            }
            onPress={() => props.navegacao.navigate('Cadastrar Disciplina')}
            >
                <Icon name="plus" size={50} style={styles.addIcon} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    addIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: 50,
        height: 50,
        right: 0,
        margin: 10,
        borderRadius: 25,
        bottom: 0
    },
    addIcon: {
        backgroundColor: "rgba(21, 209, 87,0)",
        color: '#fff',
        borderRadius: 25,
    }
})

export default Footer;