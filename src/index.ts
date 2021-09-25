import express from 'express';
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


app.listen(3000, () => {
    console.log("Rodando na porta 3000");
});