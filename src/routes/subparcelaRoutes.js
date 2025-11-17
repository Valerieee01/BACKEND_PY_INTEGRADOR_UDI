import express from "express";

import { verifyToken } from "../middlewares/auth/index.js";
import { parcialesConglomerados } from "../middlewares/Conglomerados/parcialesConglomerados.js";
import { camposConglomerados } from "../middlewares/Conglomerados/camposConglomerados.js";
import ConglomeradoController from "../controllers/conglomeradoController.js";

const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las Conglomerados
router.get("/",verifyToken, ConglomeradoController.getAllConglomerados);

// Obtener una Conglomerado por ID
router.get("/me",verifyToken, ConglomeradoController.getConglomeradosById);


export default router;




