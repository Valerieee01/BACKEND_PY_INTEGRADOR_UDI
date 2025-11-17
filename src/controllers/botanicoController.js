import { ResponseProvider } from "../providers/ResponseProvider.js";
import BotanicoService from "../services/botanicoService.js";

class BotanicoController {

  // Obtener todos los muestreos botanicos
  static getAllBotanicos = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las muestreos botanicos
      const response = await BotanicoService.getMuestreoBotanico();   
      // Validamos si no hay muestreos botanicos
      if (response.error) {        
        // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el muestreo botanico para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una botanicos por su ID
  static getAllBotanicosById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la botanicos por su ID
      const response = await BotanicoService.getMuestreoBotanicoById(id);
      if (response.error) {
        // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Crear una nueva muestreo botanico
  static createBotanicos = async (req, res) => {
    const { id_subparcela, fecha_muestreo, observaciones } = req.body;
    try {
      const response = await BotanicoService.createMuestreoBotanico(
        id_subparcela, fecha_muestreo, observaciones
      );
      if (response.error) {
        // Llamamos el botanico para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el botanico para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el botanico para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Actualizar una categoría
  static updateMuestreoBotanico = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Categoria
      const botanicos = await BotanicoService.updateMuestreoBotanico(id, campos);
      // Validamos si no se pudo actualizar la categoría
      if (botanicos.error) {
        ResponseProvider.error(
          res,
          botanicos.message,
          botanicos.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        botanicos.data,
        botanicos.message,
        botanicos.code
      );
    } catch (error) {
      // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar una muestreo botanico
  static deleteBotanico = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la muestreo botanico
      const response = await BotanicoService.deleteMuestreoBotanico(id);
      if (response.error) {
        // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el muestreo botanico para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default BotanicoController;