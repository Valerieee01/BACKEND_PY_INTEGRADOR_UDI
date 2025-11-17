import { ResponseProvider } from "../providers/ResponseProvider.js";
import SueloService from "../services/sueloService.js";

class SueloController {

  // Obtener todos los muestreos suelo
  static getAllSuelo = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las muestreos suelo
      const response = await SueloService.getMuestreoSuelo();   
      // Validamos si no hay muestreos suelo
      if (response.error) {        
        // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el muestreo suelo para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una suelo por su ID
  static getSueloById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la suelo por su ID
      const response = await SueloService.getMuestreosueloById(id);
      if (response.error) {
        // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Crear una nueva muestreo suelo
  static createSuelo = async (req, res) => {
    const { id_subparcela, profundidad_inicial, profundidad_final, textura, color_munsell, humedad, tipo_muestra, observaciones } = req.body;
    try {
      const response = await SueloService.createMuestreoSuelo(
        id_subparcela, profundidad_inicial, profundidad_final, textura, color_munsell, humedad, tipo_muestra, observaciones
      );
      if (response.error) {
        // Llamamos el suelo para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el suelo para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el suelo para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Actualizar una suelo
  static updateMuestreosuelo = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Suelo
      const suelo = await SueloService.updateMuestreoSuelo(id, campos);
      // Validamos si no se pudo actualizar la suelo
      if (suelo.error) {
        ResponseProvider.error(
          res,
          suelo.message,
          suelo.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        suelo.data,
        suelo.message,
        suelo.code
      );
    } catch (error) {
      // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar una muestreo suelo
  static deleteSuelo = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la muestreo suelo
      const response = await SueloService.deleteaMuestreoSuelo(id);
      if (response.error) {
        // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el muestreo suelo para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default SueloController;