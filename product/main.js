import routes from "./src/routes/baseRoutes.js"
import express from "express";
import db from "./src/config/dbConnect.js"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger_output.json' assert { type: 'json' }
//const swaggerDocument = await import('./swagger.json', { assert: { type: 'json' } });





db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();
//const router = express().router()
app.use(express.json())


//router.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


routes(app);

console.log('iniciando product');



export default app