import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DisciplinasProvider } from './components/context/DisciplinasContext.js';
import Disciplinas from './pages/Disciplinas';
import FormAddDisciplina from './components/forms/FormAddDisciplina';

const Stack = createStackNavigator();

function Routes() {
  return (
    <DisciplinasProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Disciplinas" component={Disciplinas} options={{
                    headerStyle: {
                        backgroundColor: '#1db954',
                    },
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }} />

                <Stack.Screen name="Cadastrar Disciplina" component={FormAddDisciplina} options={{
                    headerStyle: {
                        backgroundColor: '#1db954',
                    },
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    </DisciplinasProvider>
  );
}

export default Routes;