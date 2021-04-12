import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisciplinasContext = createContext({});

export function DisciplinasProvider({ children }) {
    const colors = {
        greenDefault: "#1db954",
        blackDefault: "#1c1c1c",
        lightDefault: "#f2f2f2",
        redDefault: "#b91d1d",
    }
    const [ darkModeActive, setDarkModeActive ] = useState(false)
    const [ disciplinas, setDisciplinas ] = useState([]) /* lista de objetos */

    useEffect(() => {
        async function loadStoragedDisciplinasData() {
            const storagedDisciplinaData = await AsyncStorage.getItem('@CharLis:disciplinas');

            if (storagedDisciplinaData) {
                const arrayDisciplinas = JSON.parse(storagedDisciplinaData).disciplinas
                setDisciplinas(arrayDisciplinas)
            }
        }
        loadStoragedDisciplinasData()
    }, [])

    async function adicionarDisciplina(jsonDisciplinaNova) {
        let novoArrayDiscplinas = Array.from(disciplinas)
        let novoJsonDisciplinaNova = {
            key: novoArrayDiscplinas.length,
            nome: jsonDisciplinaNova.nome,
            horario: jsonDisciplinaNova.horario,
            documentos: []
        }
        novoArrayDiscplinas.push(novoJsonDisciplinaNova)
        await AsyncStorage.setItem('@CharLis:disciplinas', JSON.stringify({ disciplinas: novoArrayDiscplinas }))
        setDisciplinas(novoArrayDiscplinas)
    }

    async function updateDisciplinas(indexDaDisciplina, newDocumentsArray) {
        const novoArrayDiscplinas = Array.from(disciplinas)
        const objetoDisciplina = novoArrayDiscplinas[indexDaDisciplina]
        const novoObjetoDisciplina = {
            key: objetoDisciplina.key,
            nome: objetoDisciplina.nome,
            horario: objetoDisciplina.horario,
            documentos: newDocumentsArray
        }
        novoArrayDiscplinas.splice(indexDaDisciplina, 1, novoObjetoDisciplina)
        await AsyncStorage.setItem('@CharLis:disciplinas', JSON.stringify({disciplinas: novoArrayDiscplinas}))
        setDisciplinas(novoArrayDiscplinas)
    }

    function switchDarkMode() {
        setDarkModeActive(!darkModeActive)
    }

    return (
        <DisciplinasContext.Provider
            value={{
                disciplinas,
                adicionarDisciplina,
                darkModeActive,
                switchDarkMode,
                colors,
                updateDisciplinas
            }}
        >
            {children}
        </DisciplinasContext.Provider>
    )
}

export default DisciplinasContext;