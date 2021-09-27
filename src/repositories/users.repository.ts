import pool from "../db";
import DatabaseError from "../model/errors/database.error.model";
import User from "../model/user.model";


class UserRepository {

    async obterTodos() : Promise<User[]> {
        // try {
            const query = "SELECT id, username FROM application_user";
            const result = await pool.query(query);
            return result;
        // } catch(error: Exception) {

        // }
    }

    async obterComId(id: string) : Promise<User> {
        try {
            const query = "SELECT id, username FROM application_user WHERE id = ?";
            const result = await pool.query(query, [id]);
            return result;
        } catch(error) {
            throw new DatabaseError("Erro na consulta por ID", error);
        }
    }

    async cadastrar(user: User) : Promise<User> {
        const query = "INSERT INTO application_user (username, password) VALUES (?, ?)";
        const result = await pool.query(query, [user.username, user.password]);
        // user.setId(result.insertId);
        return user;
    }

    async alterar(user: User) : Promise<User> {
        const query = "UPDATE application_user SET username = ?, password = ? WHERE id = ?";
        const result = await pool.query(query, [user.username, user.password, user.id]);
        // user.setId(result.insertId);
        return user;
    }

    async remover(id: string) : Promise<void> {
        const query = "DELETE FROM application_user WHERE id = ?";
        const result = await pool.query(query, [id]);
    }
}

export default new UserRepository();