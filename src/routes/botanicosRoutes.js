import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import { parcialesBotanico } from "../middlewares/Botanicos/parcialesBotanico.js";
import {camposBotanico} from "../middlewares/Botanicos/camposBotanico.js";
import BotanicoController from "../controllers/botanicoController.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las clientes
router.get("/", verifyToken, BotanicoController.getAllBotanicos);

// Obtener una cliente por ID
router.get("/:id", verifyToken, BotanicoController.getAllBotanicosById);

// Crear una nueva cliente
router.post("/", verifyToken, camposBotanico, BotanicoController.createBotanicos);

// Actualizar una cliente
router.put("/:id", verifyToken, camposBotanico, BotanicoController.updateMuestreoBotanico);

// Actualizar parcialmente una cliente
router.patch("/:id", verifyToken, parcialesBotanico, BotanicoController.updateMuestreoBotanico);

// Eliminar una cliente
router.delete("/:id", verifyToken, BotanicoController.deleteBotanico);

export default router;