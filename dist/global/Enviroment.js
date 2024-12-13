"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_MYSQL = exports.PASSWORD_MYSQL = exports.USER_MYSQL = exports.HOST_MYSQL = exports.SERVER_PORT = void 0;
// Node 20.11.0
//Definir el puerto del servidor
exports.SERVER_PORT = Number(process.env.PORT) || 3000;
//Definir el nombre del host
exports.HOST_MYSQL = "localhost";
//Definir nombre de usuario
exports.USER_MYSQL = "root";
//Definir contraseña
exports.PASSWORD_MYSQL = "123456789root";
//Definir la base de datos
exports.DATABASE_MYSQL = "distribuidos";
