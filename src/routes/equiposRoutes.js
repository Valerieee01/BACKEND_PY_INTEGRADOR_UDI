import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import EquiposController from "../controllers/equiposController.js";
import {parcialesEquipo} from "../middlewares/Equipo/parcialesEquipo.js";
import {camposEquipo} from "../middlewares/Equipo/camposEquipo.js";

const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las clientes
router.get("/", verifyToken,EquiposController.getAllEquipos);

// Obtener una cliente por ID
router.get("/:id",verifyToken, EquiposController.getEquiposById);

// Crear una nueva cliente
router.post("/",verifyToken, camposEquipo, EquiposController.createEquipos);

// Actualizar una cliente
router.put("/:id",verifyToken, camposEquipo, EquiposController.updateEquipos);

// Actualizar parcialmente una cliente
router.patch("/:id",verifyToken, parcialesEquipo, EquiposController.updateEquipos);

// Eliminar una cliente
router.delete("/:id",verifyToken,EquiposController.deleteEquipos);

export default router;