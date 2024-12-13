import ServeConfig from "./config/server/ServerConfig";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";

const server = ServeConfig.instance;

// BodyParser 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Cors
//server.app.options('*');
server.app.use(cors({ 
    origin: 'http://localhost:4200', // Permitir solicitudes desde Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
server.app.options('*', cors());

// Rutas de los servicios
server.app.use("/users",UserRoutes);

// Iniciar el servidor
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});