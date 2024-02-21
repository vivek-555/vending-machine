import express, { Request, Response } from 'express';
import { ProductService } from './service';
import jwtAuthz from 'express-jwt-authz';
import { AuthenticatedRequest } from '../shared/custom-request';
import { checkJwt } from '../shared/auth0';

export const routes = express.Router();

routes.get(
    '/',
    async (req: Request, res: Response) => {
        try {
            const productService = new ProductService();
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);

routes.get(
    '/:productId',
    async (req: Request, res: Response) => {
        try {
            const productService = new ProductService();
            const productId = req.params.productId;
            const product = productService.getProduct(productId);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);

routes.get(
    '/:productId/buy',
    checkJwt,
    jwtAuthz(['read:buy'], { customUserKey: 'auth', customScopeKey: 'permissions' }),
    async (req: Request, res: Response) => {
        try {
            console.log('hello');
            const authRequest = req as AuthenticatedRequest;
            const username = authRequest.auth[String(process.env.AUTH0_AUDIENCE)];
            const productId = req.params.productId;
            const quantityForPurchase = String(req.query.quantity);

            const productService = new ProductService();
            await productService.purchaseProduct(productId, quantityForPurchase, username);

            res.status(200).json('successful');
        } catch (error: any) {
            console.log('error555');
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);

routes.post(
    '/',
    jwtAuthz(['create:product'], { customUserKey: 'auth' }),
    async (req: Request, res: Response) => {
        try {
            const authRequest = req as AuthenticatedRequest;
            const username = authRequest.auth[String(process.env.AUTH0_AUDIENCE)];
            const productId = authRequest.params.productId;
            const quantityForPurchase = String(authRequest.query.quantity);

            const productService = new ProductService();
            await productService.purchaseProduct(productId, quantityForPurchase, username);

            res.status(200).json('successful');
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);