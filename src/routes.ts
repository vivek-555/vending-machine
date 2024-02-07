import express from 'express';
import { routes as userRoutes } from './user/routes';
import { routes as productRoutes } from './product/routes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/product', productRoutes);

export default routes;