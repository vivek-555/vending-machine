import express, { Request, Response } from 'express';

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