// Recibe la información de la petición y la envía al servicio
// correspondiente para que realice la operación solicitada.
import { UserModel } from "../models/UserModel";

class UserController {
    // Registra un usuario
    static async createUser(req: any, res: any) {
        // Extrae los datos de la solicitud
        const { id, name, last_name, phone, sex, birthdate, country, email, password } = req.body;
        // Transforma los datos
        const transformedData = {
            id: id,
            name: name,
            last_name: last_name,
            phone: phone,
            sex: sex === 'F' ? 'Mujer' : 'Hombre',  // Transforma 'F' a 'Mujer' y 'M' a 'Hombre'
            birthdate: birthdate,  // Si la fecha viene como cadena en formato 'YYYY-MM-DD', puedes dejarla así
            country: country,
            email: email,
            password: password  // Asegúrate de que la contraseña esté presente
        };
        try {
            // Llama al servicio para insertar los datos transformados
            const result = await UserModel.createUser(
                transformedData.id,
                transformedData.name,
                transformedData.last_name,
                transformedData.phone,
                transformedData.sex,
                transformedData.birthdate,
                transformedData.country,
                transformedData.email,
                transformedData.password
            );
            res.json(result);  // Responde con el resultado
        } catch (err) {
            console.error('Error al registrar usuario:', err);
            res.status(500).send('Error al registrar usuario');
        }
    }

    // Iniciar sesión
    static async login(req: any, res: any) {
        const { email, password } = req.body;
        try {
            // Llama al servicio de login
            const result = await UserModel.login(email, password);

            // Verifica si el usuario fue encontrado
            if (result && Array.isArray(result.msj) && result.msj.length > 0) {
                // Login exitoso
                res.json({
                    status: true,
                    message: 'Login exitoso',
                    user: Array.isArray(result.msj) ? result.msj[0] : null,  // Devuelve los datos del usuario
                    token: 'some-jwt-token'  // Aquí puedes generar y devolver un JWT si lo deseas
                });
            } else {
                // Usuario o contraseña incorrectos
                res.status(401).json({
                    status: false,
                    message: 'Usuario o contraseña incorrectos'
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({
                status: false,
                message: 'Error en el servidor'
            });
        }
    }

}

export { UserController };