import React, { createContext, useState } from 'react';

const DisciplinasContext = createContext({});

export function DisciplinasProvider({ children }) {
    const [ disciplinas, setDisciplinas ] = useState([

        {
            nome: 'xesque',
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
        {
            nome: 'Fisica Experimental',
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
        {
            nome: 'Cálculo II',
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
        {
            nome: 'xesque',
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
        {
            nome: 'Fisica Experimental',
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
        let novoArrayDiscplinas = disciplinas
        novoArrayDiscplinas.push(jsonDisciplinaNova)
        setDisciplinas(novoArrayDiscplinas)
    }


    return (
        <DisciplinasContext.Provider
            value={{
                disciplinas,
                adicionarDisciplina,
            }}
        >
            {children}
        </DisciplinasContext.Provider>
    )
}

export default DisciplinasContext;