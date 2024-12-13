"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../app/controllers/UserController");
const router = (0, express_1.Router)();
// Ruta y tipo de petición que se recibe
router.post('/createUser', UserController_1.UserController.createUser); // Registrar usuario
router.post('/login', UserController_1.UserController.login); // Iniciar sesión
exports.default = router;
