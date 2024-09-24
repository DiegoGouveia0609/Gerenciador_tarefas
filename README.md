# Gerenciado de tarefas simples

Desenvolvido por: Emanuel Soares dos Santos, Matrícula: 2022009857

Objetivo:
Desenvolver uma aplicação mobile que integre um gerenciador de tarefas com um sistema de autenticação e armazenamento em nuvem usando o Supabase, demonstrando a integração de dados e funcionalidades entre os sistemas.

Descrição:

Escolha dos Sistemas:

Supabase: Um backend que oferece autenticação, banco de dados, armazenamento e APIs REST, utilizado para gerenciar as tarefas e autenticação dos usuários.

Aplicação Mobile (Expo/React Native): Desenvolvida para permitir que os usuários façam login e manipulem suas tarefas por meio de uma interface amigável.

Planejamento da Integração:

Objetivo da Integração:

Permitir que os usuários façam login e armazenem suas tarefas no Supabase.
Sincronizar as tarefas do usuário autenticado entre o aplicativo e o banco de dados na nuvem.
Sistema(s) a ser(em) Integrado(s):

Autenticação Supabase: Gerenciar o login e cadastro de usuários.
Banco de Dados Supabase: Armazenar e gerenciar as tarefas dos usuários.
Protocolos e Tecnologias:

REST: Utilizado para comunicação entre a aplicação e o Supabase.
JSON: Formato de dados para envio e recebimento de informações.
Fluxo de Dados:

Ao realizar o login, o aplicativo obtém um token de autenticação do Supabase.
As tarefas do usuário autenticado são carregadas da API REST do Supabase.
As operações de criação, edição e exclusão de tarefas são enviadas ao Supabase via requisições HTTP.
Desenvolvimento:
Configuração das Conexões:

Configuração da URL e chave de autenticação do Supabase para conectar a aplicação mobile ao banco de dados e autenticação.
Desenvolvimento do Código:

Implementação de métodos para login e cadastro utilizando a biblioteca de autenticação do Supabase.
Criação de requisições HTTP para adicionar, listar, editar e apagar tarefas do banco de dados.
Lógica Adicional:

Implementação de feedback visual para o usuário durante operações de carregamento e envio de dados.
Uso de bibliotecas de componentes UI (React Native Paper) para melhorar a experiência do usuário.

Documentação:
Objetivo da Integração:
A aplicação mobile foi integrada com o Supabase para autenticar usuários e gerenciar suas tarefas, permitindo a sincronização de dados entre o aplicativo e o backend em nuvem.

Configuração e Integração dos Sistemas:
A integração com o Supabase foi configurada através do arquivo database.js que define a conexão com a API.
A tela de login (Autenticacao.js) gerencia o processo de autenticação, e a tela Home (Home.js) manipula as tarefas do usuário autenticado.

Código-Fonte e Como Executá-lo:
O código foi desenvolvido utilizando Expo/React Native.
Para executar a aplicação, é necessário configurar o ambiente de desenvolvimento Expo e instalar as dependências (npm install).
Execute o aplicativo com expo start.

Exemplos de Dados Trocados Entre os Sistemas:
Login: { "email": "usuario@example.com", "senha": "********" }
Tarefas: { "id": 1, "usuario": "usuario@example.com", "titulo": "Tarefa Exemplo", "descricao": "Descrição da tarefa" }

Apresentação:
Uma breve apresentação será realizada para demonstrar o processo de login, adição, edição e exclusão de tarefas, mostrando como os dados são sincronizados com o Supabase em tempo real.
[vídeo](https://youtu.be/2BBKGDF4eS0)
