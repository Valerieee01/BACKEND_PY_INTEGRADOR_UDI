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
router.get("/me",verifyToken, ConglomeradoController.getMe);

// Crear una nueva Conglomerado
router.post("/",verifyToken, camposConglomerados, ConglomeradoController.createConglomerado);

// Actualizar una Conglomerado
router.put("/:id",verifyToken, camposConglomerados, ConglomeradoController.updateConglomerado);

// Actualizar parcialmente una Conglomerado
router.patch("/:id",verifyToken, parcialesConglomerados, ConglomeradoController.updateConglomerado);

// Eliminar una Conglomerado
router.delete("/:id", verifyToken,ConglomeradoController.deleteConglomerado);

export default router;




