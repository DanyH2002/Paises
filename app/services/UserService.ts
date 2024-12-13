// Petiicones a bases de datos
import { DatabaseMethods } from "../../config/databases/DatabaseMethods";

class UserService {
    // Registra un usuario
    static async createUser(id:string,name: string, last_name: String, phone: string, sex: string, birthdate: Date, country: string, email: string, password: string) {
        const res = await DatabaseMethods.insert({
            query: 'INSERT INTO users (id, name,last_name, phone,sex, birthdate,country,email, password) VALUES (?,?,?,?,?,?,?,?,?)',
            params: [id, name, last_name, phone, sex, birthdate, country, email, password]
        });
        return res;
    }

    // Iniciar sesión
    static async login(email: string, password: string) {
        const res = await DatabaseMethods.view({
            query: 'SELECT * FROM users WHERE email = ? AND password = ?',
            params: [email, password]
        });
        return res;
    }


}

export { UserService };