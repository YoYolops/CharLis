import React, { createContext, useState } from 'react';

const DisciplinasContext = createContext({});

export function DisciplinasProvider({ children }) {
    const colors = {
        greenDefault: "#1db954",
        blackDefault: "#191919",
        lightDefault: "#f2f2f2"
    }
    const [ darkModeActive, setDarkModeActive ] = useState(false)
    const [ disciplinas, setDisciplinas ] = useState([
        {
            nome: 'Fisica II',
            horario: [
                {
                    dia: 'Seg',
                    inicio: '14',
                    fim: '16'
                },
                {
                    dia: 'Qua',
                    inicio: '16',
                    fim: '18'
                }
            ]
        },

    ]) /* lista de objetos */

    function adicionarDisciplina(jsonDisciplinaNova) {
        let novoArrayDiscplinas = Array.from(disciplinas)
        let novoJsonDisciplinaNova = {
            key: novoArrayDiscplinas.length,
            nome: jsonDisciplinaNova.nome,
            horario: jsonDisciplinaNova.horario
        }
        novoArrayDiscplinas.push(novoJsonDisciplinaNova)
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
                colors
            }}
        >
            {children}
        </DisciplinasContext.Provider>
    )
}

export default DisciplinasContext;