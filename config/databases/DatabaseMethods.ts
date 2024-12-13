// Metodos del CRUD
import { connect } from './DBConnection';
import { RowDataPacket } from 'mysql2/promise';

class DatabaseMethods {
    static async view(sql: { query: string; params: any[] }) { // Ver registros
        let connection;
        try {
            // Conectamos a la base de datos
            connection = await connect();
            // Ejecutamos el query
            const [rows] = await connection.execute<RowDataPacket[]>(sql.query, sql.params);
            // Retornamos los datos
            return { error: false, msj: rows };
        }
        catch (error) {
            return { error: true, msj: "Error query", errorData: error };
        } finally {
            if (connection) connection.end();
        }
    }

    // Insertar registros
    static async insert(sql: { query: string; params: any[] }) {
        let connection;
        try {
            // Conectamos a la base de datos
            connection = await connect();
            // Ejecutamos el query
            const [result] = await connection.execute(sql.query, sql.params);
            // Retornamos confirmación del registro
            return { error: false, msj: "Registro exitoso", result };
        } catch (error) {
            return { error: true, msj: "Error al registrar", errorData: error };
        } finally {
            if (connection) connection.end();
        }
    }
}
export { DatabaseMethods };