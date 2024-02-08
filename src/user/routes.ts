import express, { Request, Response } from 'express';
import { UserService } from './service';
import { ValidationError } from '../shared/custom-errors';

export const routes = express.Router();

routes.get(
    '/',
    async (req: Request, res: Response) => {
        try {
            // TODO: check admin role first
            const userService = new UserService();
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);

routes.post('/',
    async (req: Request, res: Response) => {
        try {
            const { username, password, deposit, role } = req.body;

            const userService = new UserService();
            await userService.createUser(username, password, deposit, role);
            res.status(201).json({ result: 'successful' });
        } catch (error: any) {
            if (error instanceof ValidationError) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(error.statusCode).json({ error: error.description });
            }
        }
    }
);

routes.put('/',
    async (req: Request, res: Response) => {
        try {
            const { username, deposit, role, deleted } = req.body;

            const userService = new UserService();
            await userService.updateUser(username, deposit, role, deleted);
            res.status(200).json({ result: 'successful' });
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);

routes.delete('/',
    async (req: Request, res: Response) => {
        try {
            const { username, role } = req.body;
            //TODO: only admin role should be able to call the delete method
            const userService = new UserService();
            await userService.deleteUser(username);
            res.status(202).json({ result: 'successful' });
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.description });
        }
    }
);

routes.post('/registration',
    async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const userService = new UserService();
            await userService.registerUser(username, password);
            res.status(201).json({ result: 'successful' });
        } catch (error: any) {
            if (error instanceof ValidationError) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.description });
            }
        }
    }
);

routes.post('/deposit',
    async (req: Request, res: Response) => {
        try {
            const { username, deposit } = req.body;
            const userService = new UserService();
            await userService.updateUser(username, deposit);
            res.status(201).json({ result: 'successful' });
        } catch (error: any) {
            if (error instanceof ValidationError) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.description });
            }
        }
    }
);