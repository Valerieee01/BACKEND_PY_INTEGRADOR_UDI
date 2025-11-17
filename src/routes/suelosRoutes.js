import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import { parcialesSuelo } from "../middlewares/Suelos/parcialesSuelo.js";
import {camposSuelo} from "../middlewares/Suelos/camposSuelo.js";
import SueloController from "../controllers/sueloController.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las clientes
router.get("/", verifyToken, SueloController.getAllSuelo);

// Obtener una cliente por ID
router.get("/:id", verifyToken, SueloController.getSueloById);

// Crear una nueva cliente
router.post("/", verifyToken, camposSuelo, SueloController.createSuelo);

// Actualizar una cliente
router.put("/:id", verifyToken, camposSuelo, SueloController.updateMuestreosuelo);

// Actualizar parcialmente una cliente
router.patch("/:id", verifyToken, parcialesSuelo, SueloController.updateMuestreosuelo);

// Eliminar una cliente
router.delete("/:id", verifyToken, SueloController.deleteSuelo);

export default router;