import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DisciplinasProvider } from './components/context/DisciplinasContext.js';
import ListaDisciplinas from './pages/ListaDisciplinas';
import DisciplinasTemplate from './pages/DisciplinaTemplate';
import FormAddDisciplina from './components/forms/FormAddDisciplina';

const Stack = createStackNavigator();

function Routes() {
    const options = {
        headerStyle: {
            backgroundColor: '#1db954',
        },
        headerTitleStyle: {
            color: '#fff'
        }
    }

    return (
        <DisciplinasProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Disciplinas"
                        component={ListaDisciplinas}
                        options={options}
                    />
                    <Stack.Screen 
                        name="CadastrarDisciplina"
                        component={FormAddDisciplina}
                        options={options}
                    />
                    <Stack.Screen
                        name="DisciplinaTemplate"
                        component={DisciplinasTemplate}
                        options={({ route }) => ({ ...options, title: route.params.title })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DisciplinasProvider>
    );
}

export default Routes;