import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import IndividuoController from "../controllers/individuosController.js";
import {parcialesIndividuo} from "../middlewares/Individuo/parcialesIndividuo.js";
import {camposIndividuo} from "../middlewares/Individuo/camposIndividuo.js";

const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las clientes
router.get("/", verifyToken,IndividuoController.getAllIndividuos);

// Obtener una cliente por ID
router.get("/:id",verifyToken, IndividuoController.getIndividuosById);

// Crear una nueva cliente
router.post("/",verifyToken, camposIndividuo, IndividuoController.createIndividuos);

// Actualizar una cliente
router.put("/:id",verifyToken, camposIndividuo, IndividuoController.updateIndividuo);

// Actualizar parcialmente una cliente
router.patch("/:id",verifyToken, parcialesIndividuo, IndividuoController.updateIndividuo);

// Eliminar una cliente
router.delete("/:id",verifyToken,IndividuoController.deleteIndividuo);

export default router;