import express from 'express';
import logger from "morgan";
import db from './src/config/dbConnect.js';
import routes from './src/routes/routes.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
dotenv.config();

const port = 3001;
const app = express();
app.use(logger('dev'));
app.use(cors())
app.use(helmet())

app.disable('x-powered-by');

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
	console.log('Conexão com o banco feita com sucesso');
});

routes(app)



app.listen(port,() => {console.log(`API Gateway running! Port ${port}`);});