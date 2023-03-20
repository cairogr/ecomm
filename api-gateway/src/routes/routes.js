import { createProxyMiddleware } from "http-proxy-middleware";
import express from 'express';
import routerLogin from './routerLogin.js';
import {authBearer} from'../middlewares/auth.js';


const routes = (app) => {
    app.use('/accounts', createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));
	app.use('/admin/accounts', authBearer, createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));
    app.use(['/categories','/admin/categories','/products', '/admin/products'], createProxyMiddleware({ target: 'http://localhost:3003/', changeOrigin: true }));
    app.use('/payments', authBearer, createProxyMiddleware({ target: 'http://localhost:3004/v1/', changeOrigin: true }));
    app.use(['/orders','/admin/orders'], createProxyMiddleware({ target: 'http://localhost:3005/v1/', changeOrigin: true }));   
    
    
    app.use(express.json(), routerLogin);
	

};

export default routes;
