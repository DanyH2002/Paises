"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Configuracion del servidor
const express_1 = __importDefault(require("express"));
// Puerto del servidor
const Enviroment_1 = require("../../global/Enviroment");
const http_1 = __importDefault(require("http"));
class ServeConfig {
    // Constructor
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Enviroment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
    }
    // Metodo para obtener la instancia
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    // Metodo para iniciar el serivicio
    start(collback) {
        this.httpServer.listen(this.port, collback);
    }
}
exports.default = ServeConfig;
