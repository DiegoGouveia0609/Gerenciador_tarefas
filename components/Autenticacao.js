import { Text,View, ActivityIndicator, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import {useState} from 'react';
import supabase from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth({navigation}) {
  const [usuario,setUsuario] = useState('');
  const [senha,setSenha] = useState('');
  const [resultado,setResultado] = useState('');
  const [carregando,setCarregando] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label} >E-mail</Text>
      
      <Input
        style={styles.input}
        onChangeText={setUsuario}
        placeholder={"Digite seu email"}
      />
      
      <Text style={styles.label} >Senha</Text>
      
      <Input
        style={styles.input}
        onChangeText={setSenha}
        placeholder={"Digite sua senha"}
        secureTextEntry={true}
      />
      
      <Button
        title={"Autenticar"}
        loading={carregando}
        onPress={
          async ()=>{
            setResultado('');
            setCarregando(true);
            let { data, error } = await supabase.auth.signInWithPassword({
              email: usuario,
              password: senha
            });
            setCarregando(false);
            if (error===null) {
              await AsyncStorage.setItem('usuario', usuario);
              navigation.navigate('Home',{username: usuario});
            }
            else {
              setResultado("USUÁRIO/SENHA incorretos!");
            }
          }
        }
      />
      
      <Text style={styles.mensagem} >{resultado}</Text>
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





