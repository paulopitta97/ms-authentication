import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
// alt shift o = ordenar imports

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Inclusão das rotas
app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

// Configuração dos handlers de erros
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Rodando na porta ${process.env.SERVER_PORT}`);
});