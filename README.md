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
# The Twelve-Factor App


| Factor | Description | Status 
|--------|-------------|--------| 
|1. Codebase | One codebase tracked in revision control, many deploys |:white_check_mark:|| 
|2. Dependencies | Explicitly declare and isolate dependencies |  :white_check_mark:|| 
|3. Config | Store config in the environment | :white_check_mark: || 
|4. Backing services | Treat backing services as attached resources | :white_check_mark: || 
|5. Build, release, run | Strictly separate build and run stages | :white_check_mark: || 
|6. Processes | Execute the app as one or more stateless processes | :white_check_mark: || 
|7. Port binding | Export services via port binding | :white_check_mark: || 
|8. Concurrency | Scale out via the process model | :white_check_mark: || 
|9. Disposability | Maximize robustness with fast startup and graceful shutdown |:white_check_mark:  || 
|10. Dev/prod parity | Keep development, staging, and production as similar as possible | :white_check_mark: || 
|11. Logs | Treat logs as event streams | :white_check_mark: || 
|12. Admin processes | Run admin/management tasks as one-off processes | :white_check_mark: |

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