import express from 'express';
import {authLocal} from'../middlewares/auth.js';
import ApiGatewayController from'../controller/ApiGatewayController.js';
import { createProxyMiddleware } from "http-proxy-middleware";
import * as rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20 // 20 requests
});


const router = express.Router();

router
	.get('/', (req, res)=>{res.status(200).send({ titulo: 'Ecomm' });})
	.post('/login', authLocal, limiter, ApiGatewayController.login)

export default router

