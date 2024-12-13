"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// Petiicones a bases de datos
const DatabaseMethods_1 = require("../../config/databases/DatabaseMethods");
class UserService {
    // Registra un usuario
    static createUser(id, name, last_name, phone, sex, birthdate, country, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.insert({
                query: 'INSERT INTO users (id, name,last_name, phone,sex, birthdate,country,email, password) VALUES (?,?,?,?,?,?,?,?,?)',
                params: [id, name, last_name, phone, sex, birthdate, country, email, password]
            });
            return res;
        });
    }
    // Iniciar sesión
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.view({
                query: 'SELECT * FROM users WHERE email = ? AND password = ?',
                params: [email, password]
            });
            return res;
        });
    }
}
exports.UserService = UserService;
