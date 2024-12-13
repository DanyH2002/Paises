import { Router } from "express";
import { UserController } from "../app/controllers/UserController";

const router = Router();

// Ruta y tipo de petición que se recibe
router.post('/createUser', UserController.createUser); // Registrar usuario
router.post('/login', UserController.login); // Iniciar sesión

export default router;