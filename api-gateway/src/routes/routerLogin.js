import express from 'express';
import {authLocal} from'../middlewares/auth.js';
import ApiGatewayController from'../controller/ApiGatewayController.js';
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router
	.get('/', (req, res)=>{res.status(200).send({ titulo: 'Ecomm' });})
	.post('/login', authLocal, ApiGatewayController.login)

export default router

