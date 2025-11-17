import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import { parcialesDetritos } from "../middlewares/Detritos/parcialesDetritos.js";
import {camposDetritos} from "../middlewares/Detritos/camposDetritos.js";
import DetritosController from "../controllers/detritosController.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las clientes
router.get("/", verifyToken, DetritosController.getAllDetritos);

// Obtener una cliente por ID
router.get("/:id", verifyToken, DetritosController.getDetritosById);

// Crear una nueva cliente
router.post("/", verifyToken, camposDetritos, DetritosController.createDetritos);

// Actualizar una cliente
router.put("/:id", verifyToken, camposDetritos, DetritosController.updateMuestreoDetrito);

// Actualizar parcialmente una cliente
router.patch("/:id", verifyToken, parcialesDetritos, DetritosController.updateMuestreoDetrito);

// Eliminar una cliente
router.delete("/:id", verifyToken, DetritosController.deleteDetrito);

export default router;