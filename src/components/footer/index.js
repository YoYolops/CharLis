import React, { useContext } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import DisciplinasContext from '../context/DisciplinasContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Footer(props) {
    const { colors, darkModeActive, switchDarkMode } = useContext(DisciplinasContext)

    return (
        <View style={[
            {
                backgroundColor: darkModeActive ? colors.blackDefault : colors.greenDefault
            },
            styles.footerContainer
        ]}>

            <Pressable style={styles.addIconContainer} onPress={switchDarkMode} android_ripple={{ color: '#aaa', borderless: true }}>
                <MaterialCommunityIcons name="theme-light-dark" size={40} style={{
                    color: darkModeActive ? '#1db954' : '#ddd',
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0)'
                }} />
            </Pressable>

            <Pressable style={styles.addIconContainer} android_ripple={{ color: colors.redDefault, borderless: true }}>
                <Ionicons name="remove-circle-outline" size={40} style={{
                    color: '#b91d1d',
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0)'
                }} />
            </Pressable>

            <Pressable style={styles.addIconContainer} onPress={() => props.navegacao.navigate('CadastrarDisciplina')} android_ripple={{ color: '#1d8c45', borderless: true }}>
                <AntDesign name="pluscircleo" size={40} style={{
                    color: darkModeActive ? '#1db954' : '#ddd',
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0)'
                }}/>
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
        borderTopColor: '#1d8c45'
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
})

export default Footer;