import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/users.repository";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.obterTodos();
    res.status(StatusCodes.OK).json(users);
});

usersRoute.get('/users/:id', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await userRepository.obterComId(id);
        res.status(StatusCodes.OK).json(user);
    } catch(error) {
        next(error);
    }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await userRepository.cadastrar(req.body);
    res.status(StatusCodes.CREATED).send(newUser);
});

usersRoute.put('/users/:id', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const usuarioModificado = req.body;
    usuarioModificado.id = req.params.id;
    const userEdited = await userRepository.alterar(usuarioModificado);
    res.status(StatusCodes.OK).json(userEdited);
});

usersRoute.delete('/users/:id', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await userRepository.remover(id);
    res.sendStatus(StatusCodes.NO_CONTENT);
});


export default usersRoute;