import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../database/database'; 

export default function CadastroUsuarioScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSignup = async () => {
    try {
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });

      if (error) {
        console.log('Erro ao cadastrar:', error.message);
        setMensagem(`Erro: ${error.message}`);
        Alert.alert('Erro', error.message);
      } else {
        setMensagem('Usuário cadastrado com sucesso! Verifique seu email para confirmar a conta.');
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso! Verifique seu email para confirmar a conta.');
      }
    } catch (err) {
      console.log('Erro de conexão ou outro erro:', err.message);
      setMensagem(`Erro inesperado: ${err.message}`);
      Alert.alert('Erro inesperado', err.message);
    }

  };



  return (

    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={handleSignup} />
      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
    </View>
  );


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  mensagem: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});
