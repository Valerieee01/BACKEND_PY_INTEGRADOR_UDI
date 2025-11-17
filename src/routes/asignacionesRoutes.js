import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import { parcialesAsignaciones } from "../middlewares/Asignaciones/parcialesAsignaciones.js";
import {camposAsignaciones} from "../middlewares/Asignaciones/camposAsignaciones.js";
import AsignacionesController from "../controllers/asignacionesController.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las clientes
router.get("/", verifyToken, AsignacionesController.getAllAsignaciones);

// Obtener una cliente por ID
router.get("/:id", verifyToken, AsignacionesController.getAsignacionesById);

// Crear una nueva cliente
router.post("/", verifyToken, camposAsignaciones, AsignacionesController.createAsignaciones);

// Actualizar una cliente
router.put("/:id", verifyToken, camposAsignaciones, AsignacionesController.updateAsignaciones);

// Actualizar parcialmente una cliente
router.patch("/:id", verifyToken, parcialesAsignaciones, AsignacionesController.updateAsignaciones);

// Eliminar una cliente
router.delete("/:id", verifyToken, AsignacionesController.deleteAsignaciones);

export default router;