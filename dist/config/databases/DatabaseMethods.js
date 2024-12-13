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
exports.DatabaseMethods = void 0;
// Metodos del CRUD
const DBConnection_1 = require("./DBConnection");
class DatabaseMethods {
    static view(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                // Conectamos a la base de datos
                connection = yield (0, DBConnection_1.connect)();
                // Ejecutamos el query
                const [rows] = yield connection.execute(sql.query, sql.params);
                // Retornamos los datos
                return { error: false, msj: rows };
            }
            catch (error) {
                return { error: true, msj: "Error query", errorData: error };
            }
            finally {
                if (connection)
                    connection.end();
            }
        });
    }
    // Insertar registros
    static insert(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                // Conectamos a la base de datos
                connection = yield (0, DBConnection_1.connect)();
                // Ejecutamos el query
                const [result] = yield connection.execute(sql.query, sql.params);
                // Retornamos confirmación del registro
                return { error: false, msj: "Registro exitoso", result };
            }
            catch (error) {
                return { error: true, msj: "Error al registrar", errorData: error };
            }
            finally {
                if (connection)
                    connection.end();
            }
        });
    }
}
exports.DatabaseMethods = DatabaseMethods;
