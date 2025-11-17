import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import IntegranteController from "../controllers/integrantesController.js";
import {parcialesIntegrantes} from "../middlewares/Integrantes/parcialesIntegrantes.js";
import {camposIntegrantes} from "../middlewares/Integrantes/camposIntegrantes.js";

const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las clientes
router.get("/", verifyToken,IntegranteController.getAllIntegrante);

// Obtener una cliente por ID
router.get("/:id",verifyToken, IntegranteController.getIntegranteById);

// Crear una nueva cliente
router.post("/",verifyToken, camposIntegrantes, IntegranteController.createIntegrante);

// Actualizar una cliente
router.put("/:id",verifyToken, camposIntegrantes, IntegranteController.updatintegrante);

// Actualizar parcialmente una cliente
router.patch("/:id",verifyToken, parcialesIntegrantes, IntegranteController.updatintegrante);

// Eliminar una cliente
router.delete("/:id",verifyToken,IntegranteController.deleteintegrante);

export default router;