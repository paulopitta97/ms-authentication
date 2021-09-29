import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';
import ForbiddenError from "../model/errors/forbidden.error.model";
import usersRepository from "../repositories/users.repository";

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if( !authorizationHeader ) {
            throw new ForbiddenError('Credenciais não informadas.');
        }

        // Bearer xxxxxxxxx.xxxxxxxxxxxxxxxxxxxxx.xxxxxxx
        const [authenticationType, token] = authorizationHeader.split(' ');
        if(authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação invalida.');
        }

        const secretKey = '' + process.env.SECRET_KEY;
        const tokenPayload = JWT.verify(token, secretKey)

        if( typeof tokenPayload !== 'object' || !tokenPayload.sub ) {
            throw new ForbiddenError('Token invalido.');
        }

        // const id = tokenPayload.sub;
        // const usuario = await usersRepository.obterComId(id); // NÃO PRECISA
        const usuario = {
            id: tokenPayload.sub,
            username: tokenPayload.username
        }
        if( !usuario ) {
            throw new ForbiddenError('Usuario ou senha invalidos.');
        }

        // setando o usuario no Request para usar na aplicação toda...
        req.user = usuario;
        next();
    } catch(error) {
        next(error);
    }
}

export default bearerAuthenticationMiddleware;