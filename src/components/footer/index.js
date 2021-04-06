import React, { useContext } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import DisciplinasContext from '../context/DisciplinasContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Footer(props) {
    const { colors, darkModeActive, switchDarkMode } = useContext(DisciplinasContext)

    return (
        <View style={[
            {
                backgroundColor: darkModeActive ? colors.blackDefault : colors.greenDefault
            },
            styles.footerContainer
        ]}>

            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed
                    ? 'rgba(29, 185, 84, 0.5)'
                    : 'rgba(29, 185, 84, 0)'
                },
                styles.addIconContainer
            ]}
            onPress={switchDarkMode}>
                <MaterialCommunityIcons name="theme-light-dark" size={40} style={styles.addIcon} />
            </Pressable>

            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed
                    ? 'rgba(29, 185, 84, 0.5)'
                    : 'rgba(29, 185, 84, 0)'
                },
                styles.addIconContainer
            ]
            }
            onPress={() => props.navegacao.navigate('Cadastrar Disciplina')}>
                <AntDesign name="pluscircleo" size={40} style={styles.addIcon} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#fff'
    },
    addIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: 40,
        height: 40,
        right: 0,
        margin: 10,
        borderRadius: 25,
        bottom: 0
    },
    addIcon: {
        color: '#fff',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0)'
    }
})

export default Footer;