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
exports.UserModel = void 0;
const UserService_1 = require("../services/UserService");
class UserModel {
    // Registra un usuario
    static createUser(id, name, last_name, phone, sex, birthdate, country, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserService_1.UserService.createUser(id, name, last_name, phone, sex, birthdate, country, email, password);
        });
    }
    // Iniciar sesión
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserService_1.UserService.login(email, password);
        });
    }
}
exports.UserModel = UserModel;
