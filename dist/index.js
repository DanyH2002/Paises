"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConfig_1 = __importDefault(require("./config/server/ServerConfig"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const server = ServerConfig_1.default.instance;
// BodyParser 
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Cors
//server.app.options('*');
server.app.use((0, cors_1.default)({
    origin: 'http://localhost:4200', // Permitir solicitudes desde Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
server.app.options('*', (0, cors_1.default)());
// Rutas de los servicios
server.app.use("/users", UserRoutes_1.default);
// Iniciar el servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
