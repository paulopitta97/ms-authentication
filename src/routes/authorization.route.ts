import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import ForbiddenError from "../model/errors/forbidden.error.model";
import userRepository from "../repositories/users.repository";
import JWT from 'jsonwebtoken';
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = req.user;

        if(!usuario) {
            throw new ForbiddenError('Usuario nao informado');
        }

        // "jti" => id do token
        // "iat" => data criação token
        // "nbf" => define uma data de inicio para o token, ou seja, o token não será válido antes dessa data
        // "exp" => data de expiração token
        // "aud" => define quem pode usar o token
        // "sub" => é o assunto do token, mas é muito usado para guardar o id do usuário
        // "iss" => o dominio da aplicação que gera o token

        const jwtPayload = { username: usuario.username };
        const jwtOptions = { subject: '' + usuario?.id };
        const secretKey = '' + process.env.SECRET_KEY;

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).send({token: jwt});
    } catch(error) {
        next(error);
    }
});

export default authorizationRoute;