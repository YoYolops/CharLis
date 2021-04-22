import React, { useState, useContext  } from 'react';
import { Pressable, StyleSheet } from 'react-native'

import DisciplinasContext from '../context/DisciplinasContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react/cjs/react.development';


function RemovalBox(props) {
    const [ selected, setSelected ] = useState(false)
    const { colors } = useContext(DisciplinasContext)

    useEffect(() => {
        setSelected(false)
    }, [props.removalModeActive])

    function pressHandler() {
        if (!selected) {
            props.addRemovalItem()
            setSelected(true)
        } else {
            props.removeRemovalItem()
            setSelected(false)
        }
    }

    return (
        <Pressable style={{display: props.removalModeActive ? 'flex' : 'none'}} onPress={pressHandler} android_ripple={{color: colors.redDefault, borderless: true}} hitSlop={props.hitSlop}>
            {
                props.ico === 1 
                ? <Ionicons size={props.size} style={{color: colors.redDefault}} name={props.removalModeActive ? selected ? "remove-circle-sharp" : "remove-circle-outline": ''} />
                : <AntDesign size={props.size} style={{color: colors.redDefault}} name={props.removalModeActive ? selected ? "closecircle" : "closecircleo": ''}/>
            }
        </Pressable>
    )
};


export default RemovalBox;