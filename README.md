# About

Ecommerce project created during Alura's LevelUp program

## Runing
- Use `npm install` to install dependencies
- Use `npm start` to run the app
- Use `npm test` to run the unit test suite

## Instalando docker para usar o MongoDB e MySQL

```shell
## ---- MYSQL
docker run \
    --name mysql-ecomm \
    -e MYSQL_ROOT_PASSWORD: secret
    -p 3306:3306 \
    -d \
    mysql
## ---- MONGODB
docker run \
    --name mongodb-ecomm \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    -d \
    mongo
```
## Checklist Features

- MongoDB
    - [x] Create connection with MongoDB
    - [x] Create model  

- Product API
    - [x] GET product by ID
    - [x] GET ALL products
    - [x] POST product
    - [x] UPDATE product
    - [x] DELETE product
    
- Account API
    - [x] GET Account by ID
    - [x] GET ALL Accounts
    - [x] POST Account
    - [x] UPDATE Account
    - [x] DELETE Account

- Payment API
    - [x] GET Payment by ID
    - [x] GET ALL Payments
    - [x] POST Payment
    - [x] UPDATE Payment
    - [x] DELETE Payment

- Order API
    - [x] GET Order by ID
    - [x] GET ALL Orders
    - [x] POST Order
    - [x] UPDATE Order
    - [x] DELETE Order

- Model APIs with Swagger
    - [x] Model product API
    - [x] Model account API
    - [ ] Model payment API
    - [ ] Model order API

- Auth
    - [x] login
    - [x] validate user token
    - [x] sign up

- API Gateway
    - [ ] Create API Gateway
    - [ ] Change routes for API Gateway

    
## The Twelve-Factor App

Tendo como base o manifesto Twelve-Factor App. Segue uma breve analise de como está aplicado no atual projeto:

#### I. Base de Código
```Uma base de código com rastreamento utilizando controle de revisão``` 
Esse primeiro fator é aplicado ao projeto, pois todos os ativos relacionados a um aplicativo, desde o código-fonte, o script de provisionamento e as definições de configuração, são armazenados em um repositório.
#### II. Dependências
```Declare e isole as dependências.```
Apenas o código-fonte é armazenado no controle do código-fonte. As dependencias externas são armazenadas externamente e gerenciadas pelo npm do Node.js.
#### III. Configurações
```Armazene as configurações no ambiente.```
Determinadas configurações são feitas em variáveis de ambiente para que estejam apenas no ambiente de execução.
#### IV. Serviços de Apoio
```Trate os serviços de apoio, como recursos ligados.```
Neste projeto os bancos de dados são tratados como serviços de apoio para que se tenha flexibilidade e eficiência no ciclo de vida de desenvolvimento de software.
#### V. Construa, lance, execute
```Separe estritamente os builds e execute em estágios.```
A implantação do projeto segue os três estágios.
#### VI. Processos
```Execute a aplicação como um ou mais processos que não armazenam estado.```
Os processos da aplicação Ecomm são stateless. Quando há necessidade da persitência de dados, ela é feita no serviço de apoio, que neste caso é um banco de dados(MongoDB ou MySQL).
#### VII. Vínculo de porta
```Exporte serviços por ligação de porta.```
Os serviços da aplicação Ecomm é identificável para a rede pelo número da porta,
#### VIII. Concorrência
```Dimensione por um modelo de processo.```
A aplicação é dividida em processos independentes com base em tipos de processo. Desta forma, os processos distribuídos podem executar blocos de trabalho de forma independente e escalonar, adicionando mais processos.
#### IX. Descartabilidade
```Maximizar a robustez com inicialização e desligamento rápido.```
Está sendo implementado o desligamento “gracioso”, quando uma aplicação capaz de auto finalizar sem danos à solução;
#### X. Dev/prod semelhantes
```Mantenha o desenvolvimento, teste, produção o mais semelhante possível.```
Com o uso do Docker e o Docker Compose, é possível garantir que a pilha do aplicativo mantenha a forma e a instrumentação em ambientes diferentes.
#### XI. Logs
```Trate logs como fluxo de eventos.```
Com a implementação da API Gateway foi possível o envio de dados de log em um fluxo.
#### XII. Processos de Admin
```Executar tarefas de administração/gerenciamento como processos pontuais.```
A aplicação ainda não possuí um processo administrativo que geralmente consistem em tarefas pontuais ou tarefas cronometradas e recorrentes, como gerar relatórios, executar scripts em lote, iniciar backups de bancos de dados e migrar esquemas.



## Arquitetura de Microservices

Com base nos padrões utilizados para desenvolvimento de arquitetura voltada a Microsserviços, segue uma analise do atual projeto:

### Decomposition Patterns

- Serviços de domínio
  
    Decompor um aplicativo usando recursos de negócios pode ser um bom começo, mas você encontrará as chamadas “Classes de Deus”, que não serão fáceis de decompor.

- Serviços de negócio
    
    Os microsserviços tratam de tornar os serviços fracamente acoplados, aplicando o princípio da responsabilidade única.

### Integration Patterns    

- API Gateway Pattern

    Não importa quantos microservices você tenha, colocando um API Gateway à frente deles você terá uma única URL para se preocupar. O API Gateway, por sua vez, roteia e gerencia o tráfego de requisições para os microservices de destino.

- Agregador de processos

    Ao quebrar a funcionalidade do negócio em vários códigos lógicos menores, torna-se necessário pensar em como colaborar os dados retornados por cada serviço. O padrão Aggregator ajuda a lidar com isso.Ele fala sobre como podemos agregar os dados de diferentes serviços e então enviar a resposta final ao consumidor.

#### - Edge service
    Um serviço de borda é um componente exposto à Internet pública. Ele atua como um gateway para todos os outros serviços.
#### - Single database vs Bancos diferentes
    Um banco de dados por microsserviço deve ser projetado. Deve ser privado apenas para esse serviço. Ele deve ser acessado apenas pela API do microsserviço.
#### - Eventos assíncronos‌
    Alguns eventos assíncronos foram implementados neste projeto para garantir o funcionamento adequado da aplicação.

### Observability Patterns

- Log Aggregation

    Considere uma aplicação com vários serviçoes, as solicitações geralmente abrangem várias instâncias desse serviço. Cada instância de serviço gera um arquivo de log em um formato padronizado.

- Performance Metrics

   Quando o portfólio de serviços aumenta devido a uma arquitetura de microsserviços, torna-se fundamental monitorar as transações para que os padrões possam ser monitorados e os alertas enviados quando ocorrer um problema.