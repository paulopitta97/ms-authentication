import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../model/errors/forbidden.error.model";
import usersRepository from "../repositories/users.repository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if( !authorizationHeader ) {
            throw new ForbiddenError('Credenciais não informadas.');
        }
        // Basic YWRtaW46YWRtaW4=
        const [authenticationType, token] = authorizationHeader.split(' ');
        if(authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação invalida.');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');

        if(!username || !password) {
            throw new ForbiddenError('Credenciais não preenchidas.');
        }

        const usuario = await usersRepository.obterComUsernameEPassword(username, password);
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

export default basicAuthenticationMiddleware;