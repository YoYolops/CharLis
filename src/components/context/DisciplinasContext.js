import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisciplinasContext = createContext({});

export function DisciplinasProvider({ children }) {
    const colors = {
        greenDefault: "#1db954",
        blackDefault: "#1c1c1c",
        lightDefault: "#ddd",
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
        const novoArrayDisciplinas = Array.from(disciplinas)
        const objetoDisciplina = novoArrayDisciplinas[indexDaDisciplina]
        const novoObjetoDisciplina = {
            key: objetoDisciplina.key,
            nome: objetoDisciplina.nome,
            horario: objetoDisciplina.horario,
            documentos: newDocumentsArray
        }
        novoArrayDisciplinas.splice(indexDaDisciplina, 1, novoObjetoDisciplina)
        await AsyncStorage.setItem('@CharLis:disciplinas', JSON.stringify({disciplinas: novoArrayDisciplinas}))
        setDisciplinas(novoArrayDisciplinas)
    }

    async function removeDisciplina(listaIndexesDeRemocao) {
        const novoArrayDisciplinas = Array.from(disciplinas)
        for (let i = 0; i < listaIndexesDeRemocao.length; i++) {
            novoArrayDisciplinas.splice(listaIndexesDeRemocao[i] - i, 1)
        }
        await AsyncStorage.setItem('@CharLis:disciplinas', JSON.stringify({disciplinas: novoArrayDisciplinas}))
        setDisciplinas(novoArrayDisciplinas)
    }

    function switchDarkMode() {
        setDarkModeActive(!darkModeActive)
    }

    return (
        <DisciplinasContext.Provider
            value={{
                disciplinas,
                adicionarDisciplina,
                updateDisciplinas,
                removeDisciplina,
                darkModeActive,
                switchDarkMode,
                colors,
            }}
        >
            {children}
        </DisciplinasContext.Provider>
    )
}

export default DisciplinasContext;