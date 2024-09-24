import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './components/Home';
import Auth from './components/Autenticacao';
//import Usuario from './components/Usuario';
import CadastroUsuarioScreen from './components/Cadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Principal'}}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroUsuarioScreen}
          options={{title: 'Cadastro'}}
        />
        <Stack.Screen
          name="Autenticacao"
          component={Auth}
          options={{title: 'Autenticacao'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
