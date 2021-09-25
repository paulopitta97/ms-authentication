import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [{userName: 'Paulo'}];
    res.status(StatusCodes.OK).json(users);
});

usersRoute.get('/users/:id', (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const users = [{userName: 'Paulo'}];
    res.status(StatusCodes.OK).json(users);
});

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send(newUser);
});

usersRoute.put('/users/:id', (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userEdited = req.body;
    res.status(StatusCodes.OK).json(userEdited);
});

usersRoute.delete('/users/:id', (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    res.sendStatus(StatusCodes.NO_CONTENT);
});


export default usersRoute;