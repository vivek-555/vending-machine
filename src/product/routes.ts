import express, { Request, Response } from 'express';
import { ProductService } from './service';

export const routes = express.Router();

routes.get(
    '/',
    async (req: Request, res: Response) => {
        try {
            const response = 'successful product api';
            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);

routes.get(
    '/:productId/buy',
    async (req: Request, res: Response) => {
        try {
            const username = ''; // TODO: figure out this part
            const productId = req.params.productId;
            const quantityForPurchase = String(req.query.quantity);
            
            const productService = new ProductService();
            await productService.purchaseProduct(productId, quantityForPurchase, username);

            res.status(200).json('successful');
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);