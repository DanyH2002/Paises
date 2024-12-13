import { UserService } from "../services/UserService";
class UserModel {
    // Registra un usuario
    static async createUser(id: string,name: string, last_name: String, phone: string, sex: string, birthdate: Date, country: string, email: string, password: string) {
        return await UserService.createUser(id,name, last_name, phone, sex, birthdate, country, email, password);
    }

    // Iniciar sesión
    static async login(email: string, password: string) {
        return await UserService.login(email, password);
    }
}

export { UserModel };