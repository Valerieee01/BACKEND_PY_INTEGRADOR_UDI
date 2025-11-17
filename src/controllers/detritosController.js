import { ResponseProvider } from "../providers/ResponseProvider.js";
import DetritoService from "../services/detritosService.js";

class DetritosController {

  // Obtener todos los muestreos botanicos
  static getAllDetritos = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las muestreos detritos
      const response = await DetritoService.getMuestreoDetritos();   
      // Validamos si no hay muestreos detritos
      if (response.error) {        
        // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el muestreo detrito para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una detritos por su ID
  static getDetritosById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la detritos por su ID
      const response = await DetritoService.getMuestreoDetritosById(id);
      if (response.error) {
        // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Crear una nueva muestreo detrito
  static createDetritos = async (req, res) => {
    const { id_subparcela, tipo_elemento, diametro, longitud, estado_descomposicion, posicion, observaciones } = req.body;
    try {
      const response = await DetritoService.createMuestreoDetritos(
        id_subparcela, tipo_elemento, diametro, longitud, estado_descomposicion, posicion, observaciones
      );
      if (response.error) {
        // Llamamos el detrito para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el detrito para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el detrito para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Actualizar una detritos
  static updateMuestreoDetrito = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Categoria
      const detritos = await DetritoService.updateMuestreoDetritos(id, campos);
      // Validamos si no se pudo actualizar la detritos
      if (detritos.error) {
        ResponseProvider.error(
          res,
          detritos.message,
          detritos.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        detritos.data,
        detritos.message,
        detritos.code
      );
    } catch (error) {
      // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar una muestreo detrito
  static deleteDetrito = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la muestreo detrito
      const response = await DetritoService.deleteaMuestreoDetritos(id);
      if (response.error) {
        // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default DetritosController;