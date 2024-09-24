import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Platform, StyleSheet, ScrollView } from 'react-native';
import { Button, IconButton, TextInput as PaperInput } from 'react-native-paper';
import { supabase } from '../database/database'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {
  
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState('');
  const [editingTask, setEditingTask] = useState(null);



  useEffect(() => {

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

      if (session) {
        setUser(session.user);
        fetchTasks(session.user.id);
      } else {
        setUser(null);
      }

  });

    return () => {
        authListener?.unsubscribe();
      };
    }, []);



  const fetchTasks = async (userId) => {

    setLoading(true);

    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .eq('usuario', userId);

    if (error) {
      console.log('Erro ao buscar tarefas:', error.message);
    } else {
      setTasks(data);
    }
    
    setLoading(false);

  };


const saveTask = async () => {
  if (taskTitle.trim() === '' || taskDescription.trim() === '') {
    setTaskStatus('Preencha o título e a descrição');
    return;
  }

  setLoading(true);
  setTaskStatus('Salvando tarefa...');

  if (editingTask) {

    const { error } = await supabase
      .from('tarefas')
      .update({ titulo: taskTitle, descricao: taskDescription })
      .eq('id', editingTask.id);

    if (error) {
      setTaskStatus('Erro ao editar tarefa: ' + error.message);
    } else {
      setTaskStatus('Tarefa editada com sucesso!');
      setEditingTask(null);
    }

  } else {

    const { data, error } = await supabase
      .from('tarefas')
      .insert([{ usuario: user.id, titulo: taskTitle, descricao: taskDescription }]);

    if (error) {
      setTaskStatus('Erro ao adicionar tarefa: ' + error.message);
    } else {
      setTaskStatus('Tarefa adicionada com sucesso!');
    }

  }

  
  setTaskTitle('');
  setTaskDescription('');
  
  
  await fetchTasks(user.id);

  setLoading(false);
};


  const startEditingTask = (task) => {
    
    setTaskTitle(task.titulo);
    setTaskDescription(task.descricao);
    setEditingTask(task);
  };

  const deleteTask = async (taskId) => {


    setLoading(true);

    const { error } = await supabase
      .from('tarefas')
      .delete()
      .eq('id', taskId);

    if (error) {
      setTaskStatus('Erro ao apagar tarefa: ' + error.message);

    } else {
      const filteredTasks = tasks.filter(task => task.id !== taskId);

      setTasks(filteredTasks);

      setTaskStatus('Tarefa apagada com sucesso!');
    }

    setLoading(false);



  };

  const handleLogout = async () => {

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Erro ao deslogar:', error.message);
    } else {
      setUser(null);
      navigation.navigate('Autenticacao');
    }

  };





  return (

    <View style={styles.container}>
      {user ? (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Bem-vindo, {user.email}!</Text>

            {/* Botão sair */}
            <IconButton
              icon="logout"
              color="#000"
              size={24}
              onPress={handleLogout}
              style={styles.logoutButton}
            />
          </View>

          {/* Formulário de adicão de tarefas */}
          <PaperInput
            label="Título da Tarefa"
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.input}
          />
          <PaperInput
            label="Descrição da Tarefa"
            value={taskDescription}
            onChangeText={setTaskDescription}
            style={styles.input}
          />

          <Button
            mode="contained"
            icon={editingTask ? "pencil" : "plus"}
            onPress={saveTask}
            color={editingTask ? '#FFEB3B' : '#4CAF50'} 
            style={styles.actionButton}
          >
            {editingTask ? 'Salvar' : 'Adicionar'}
          </Button>

          
          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          {/* Lista de Tarefas */}
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.taskContainer}>
                <Text style={styles.taskTitle}>{item.titulo}</Text>
                <Text>{item.descricao}</Text>
                
                <View style={styles.taskActions}>

                  {/* Botão editar */}
                  <IconButton
                    icon="pencil"
                    color="#FFEB3B" 
                    size={24}
                    onPress={() => startEditingTask(item)}
                    style={styles.editButton}
                  />

                  {/* Botão delete */}
                  <IconButton
                    icon="delete"
                    color="#F44336" 
                    size={24}
                    onPress={() => deleteTask(item.id)}
                    style={styles.deleteButton}
                  />
                </View>
              </View>
            )}
          />

          
          <Text style={styles.statusText}>{taskStatus}</Text>
        </View>
      ) : (

        <View style={styles.notLoggedIn}>
          <Text>Você não está logado. Faça login ou cadastre-se para acessar suas tarefas.</Text>
          <Button onPress={() => navigation.navigate('Autenticacao')}>Ir para Login</Button>
          <Button onPress={() => navigation.navigate('Cadastro')}>Cadastra-se</Button>
        </View>
      )}
    </View>



    
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
  },
  actionButton: {
    borderRadius: 50,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  taskContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    // Aplicando sombras
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  taskTitle: {
    fontSize: 16,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    borderRadius: 50,
    backgroundColor: '#FFF8E1',
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  deleteButton: {
    borderRadius: 50,
    backgroundColor: '#FFEBEE',
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  logoutButton: {
    alignSelf: 'flex-end',
  },
  statusText: {
    marginTop: 20,
  },
  notLoggedIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;














