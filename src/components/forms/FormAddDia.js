import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import DisciplinasContext from '../context/DisciplinasContext';

function FormAddDia(props) {
    const { darkModeActive, colors } = useContext(DisciplinasContext)

    const [ diaSemanaSelecionado, setDiaSemanaSelecionado ] = useState('Seg');
    const [ horaInicio, setHoraInicio ] = useState('1h');
    const [ minutoInicio, setMinutoInicio ] = useState('00min');
    const [ horaTermino, setHoraTermino ] = useState('1h');
    const [ minutoTermino, setMinutoTermino ] = useState('00min');
    const [ finalizado, setFinalizado ] = useState(false);

    const optionsDiaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const optionsHorario = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00'];
    const optionsMinuto = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']

    function enviarHorario() {
        const horarioNovo = {
            dia: diaSemanaSelecionado,
            inicio: `${horaInicio + ' ' + minutoInicio}`,
            fim: `${horaTermino + ' ' + minutoTermino}`
        }
        props.adicionarHorario(horarioNovo)
        setFinalizado(true)
    }

    return (
        <View style={styles.pickerContainer}>
            <Picker
                style={styles.picker}
                enabled={!finalizado}
                onValueChange={(itemValue, itemIndex)  => {
                    setDiaSemanaSelecionado(itemValue)
                }}
                mode={'dropdown'}>
                {
                    optionsDiaSemana.map(dia => <Picker.Item key={dia} color={darkModeActive ? colors.greenDefault : colors.blackDefault} value={dia} label={dia} />)
                }
            </Picker>

            <View style={styles.deAte}>
                <Text style={{color: darkModeActive ? colors.greenDefault : colors.blackDefault, marginLeft: 5}}>
                    De: 
                </Text>
                <Picker
                    style={styles.picker}
                    enabled={!finalizado}
                    onValueChange={(itemValue, itemIndex)  => {
                        setHoraInicio(itemValue)
                    }}
                    mode={'dropdown'}>
                    {
                        optionsHorario.map(horario => <Picker.Item key={horario} color={darkModeActive ? colors.greenDefault : colors.blackDefault} value={horario + 'h'} label={horario + 'h'} />)
                    }
                </Picker>

                <Picker
                    style={styles.picker}
                    enabled={!finalizado}
                    onValueChange={(itemValue, itemIndex)  => {
                        setMinutoInicio(itemValue)
                    }}
                    mode={'dropdown'}>
                    {
                        optionsMinuto.map(minuto => <Picker.Item key={minuto} color={darkModeActive ? colors.greenDefault : colors.blackDefault} value={minuto + ' min'} label={minuto + ' min'} />)
                    }
                </Picker>
            </View>

            <View style={styles.deAte}>
                <Text
                    style={{color: darkModeActive ? colors.greenDefault : colors.blackDefault, marginLeft: 5}}
                >
                    Até: 
                </Text>
                <Picker
                    style={styles.picker}
                    enabled={!finalizado}
                    onValueChange={(itemValue, itemIndex)  => {
                       setHoraTermino(itemValue)
                    }}
                    mode={'dropdown'}>
                    {
                        optionsHorario.map(horario => <Picker.Item key={horario} color={darkModeActive ? colors.greenDefault : colors.blackDefault} value={horario + 'h'} label={horario + 'h'} />)
                    }
                </Picker>

                <Picker
                    style={styles.picker}
                    enabled={!finalizado}
                    onValueChange={(itemValue, itemIndex)  => {
                        setMinutoTermino(itemValue)
                    }}
                    mode={'dropdown'}>
                    {
                        optionsMinuto.map(minuto => <Picker.Item key={minuto} color={darkModeActive ? colors.greenDefault : colors.blackDefault} value={minuto + ' min'} label={minuto + ' min'} />)
                    }
                </Picker>
            </View>
            <Button onPress={enviarHorario} title="Finalizar" color='rgb(29, 185, 84)' disabled={finalizado} />
        </View>
    )
};

const styles = StyleSheet.create({
    pickerContainer: {
        margin: 10,
        borderRadius: 5,
        borderLeftWidth: 3,
        borderLeftColor: 'rgb(29, 185, 84)',
    },
    labelInput: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 16,
    },
    input: {
        margin: 10,
        marginTop: 0,
        height: 40,
        borderBottomWidth: 2,
        borderColor: 'rgb(29, 185, 84)',
    },
    deAte: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        borderRadius: 5,
        borderLeftWidth: 2,
        borderLeftColor: 'rgb(29, 185, 84)',
    },
    picker: {
        width: 130,
        height: 40,
    },
})

export default FormAddDia;