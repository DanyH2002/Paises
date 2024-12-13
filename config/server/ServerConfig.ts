// Configuracion del servidor
import express from 'express';

// Puerto del servidor
import { SERVER_PORT } from '../../global/Enviroment';
import http from 'http';

export default class ServeConfig {
    private static _instance: ServeConfig;
    public app: express.Application;
    public port: number;
    private httpServer: http.Server;

    // Constructor
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
    }

    // Metodo para obtener la instancia
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    // Metodo para iniciar el serivicio
    start(collback:any){
        this.httpServer.listen(this.port, collback);
    }
}