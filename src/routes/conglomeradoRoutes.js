import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import { parcialesConglomerados } from "../middlewares/conglomerado/parcialesConglomerado.js";
import { camposConglomerados } from "../middlewares/conglomerado/camposConglomerado.js";
import ConglomeradoController from "../controllers/conglomeradoController.js";

const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las Conglomerados
router.get("/",verifyToken, ConglomeradoController.getAllConglomerados);

// Obtener una Conglomerado por ID
router.get("/me",verifyToken, ConglomeradoController.getMe);

export default router;




