import React, { useState, useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native'

import DisciplinasContext from '../context/DisciplinasContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

function RemovalBox(props) {
    const [ selected, setSelected ] = useState(false)
    const { colors } = useContext(DisciplinasContext)

    return (
        <Pressable style={styles.removalClickRegion} onPress={props.addRemovalItem} android_ripple={{color: colors.redDefault, borderless: true}} hitSlop={64}>
            <Ionicons size={28} style={{color: colors.redDefault}} name={props.removalModeActive
                    ? selected ? "remove-circle-sharp" : "remove-circle-outline"
                    : ''} />
        </Pressable>
    )
};

const styles = StyleSheet.create({

})

export default RemovalBox;