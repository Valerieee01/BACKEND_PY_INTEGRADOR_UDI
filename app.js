import express from "express";
import dotenv from "dotenv"; // trabajar con el archivo de configuracion 
import cors from "cors";// para trabajar fuera del dominio
import bodyParser from "body-parser"; //parsear de lo que recibire en la informacion
import cookieParser from "cookie-parser"; // autenticacion para enviar una cookie

import authRoutes from "./src/routes/authRoutes.js";
import administradorRoutes from "./src/routes/administradorRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";
import empleadosRoutes  from "./src/routes/empleadosRoutes.js";
import equiposRoutes  from "./src/routes/equiposRoutes.js";
import personasRoutes from "./src/routes/personasRoutes.js";
import asignacionesRoutes from "./src/routes/asignacionesRoutes.js";
import botanicosRoutes from "./src/routes/botanicosRoutes.js";
import conglomeradosRoutes from "./src/routes/conglomeradoRoutes.js";
import detritosRoutes from "./src/routes/detritosRoutes.js";
import subparcelaRoutes from "./src/routes/subparcelaRoutes.js";
import individuoRoutes from "./src/routes/individuoRoutes.js";
import suelosRoutes from "./src/routes/suelosRoutes.js";
import integrantesRoutes from "./src/routes/integrantesRoutes.js";





dotenv.config();

// Crear la instancia de Express
const app = express();
// Middleware
// Habilita CORS
app.use(cors()); 
// Permite que la app acepte datos JSON
app.use(bodyParser.json()); 
// app.use(express.json());
// Permite el envio de datos de tipo utlencode
app.use(express.urlencoded({ extended: true }));
// Permite manejar cookies en las respuestas.
app.use(cookieParser());

// Rutas navegación
app.use("/api/user", usuariosRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/equipos", equiposRoutes);
app.use("/api/asignaciones", asignacionesRoutes);
app.use("/api/botanicos", botanicosRoutes);
app.use("/api/conglomerado", conglomeradosRoutes);
app.use("/api/subparcela", subparcelaRoutes);
app.use("/api/detritos", detritosRoutes);
app.use("/api/individuo", individuoRoutes);
app.use("/api/persona", personasRoutes);
app.use("/api/suelo", suelosRoutes);
app.use("/api/integrantes", integrantesRoutes);

//rutas autenticación
app.use("/api/auth", authRoutes);
app.use("/api/admin", administradorRoutes);

app.get('/rutas', (req, res) => {
  const rutas = [];

  app._router?.stack.forEach(r => {
    if (r.route) {
      rutas.push({
        metodo: Object.keys(r.route.methods)[0].toUpperCase(),
        ruta: r.route.path
      });
    }
  });

  res.json(rutas);
});
// Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});