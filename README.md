# Desafio prático Onfly

### Para iniciar o projeto rode um dos comandos

- npm install

### Banco de dados

- Crie o container docker para a conexão com o banco de dados local (substitua 'mysecretpassword' pela senha desejada)
  - docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

- Crie o banco de dados 'onfly'

- Rodar o comando abaixo para criar o schema do banco
  - npm run typeorm migration:run

### Variaveis de ambiente

- Crie um arquivo .env seguindo o exemplo no arquivo .env.example

### Iniciando a aplicação

- Após criar o container e instalar as dependencias rode um dos comandos abaixo para inciar a aplicação
  - npm run dev

### A documentação de parametros das rotas pode ser vista na seguint URL local após inicialização da api

- http://localhost:3333/documentation

### Para rodar os testes

- Altere a variavel de ambiente JEST_NODE_ENV passando o valor 'test'
- Rode um dos comandos abaixo:
  - npm run test
