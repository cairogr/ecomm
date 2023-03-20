import express from 'express';
import logger from "morgan";
import db from './src/config/dbConnect.js';
import routes from './src/routes/routes.js';
import dotenv from 'dotenv';
dotenv.config();
import { createProxyMiddleware } from "http-proxy-middleware";

const port = 3001;
const app = express();
app.use(logger('dev'));

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
	console.log('Conexão com o banco feita com sucesso');
});

routes(app)



app.listen(port,() => {console.log(`API Gateway running! Port ${port}`);});