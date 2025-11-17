import { ResponseProvider } from "../providers/ResponseProvider.js";
import IntegranteService from "../services/integrantesService.js";

class IntegranteController {

  // Obtener todos loss Integrante
  static getAllIntegrante = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener lass integrante
      const response = await IntegranteService.getIntegrantesEquipo();   
      // Validamos si no hays integrante
      if (response.error) {        
        // Llamamos el integrante para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el integrante para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el integrante para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una integrante por su ID
  static getIntegranteById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la integrante por su ID
      const response = await IntegranteService.getIntegrantesEquipoById(id);
      if (response.error) {
        // Llamamos el integrante para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el integrante para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el integrante para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Crear una nueva integrante
  static createIntegrante = async (req, res) => {
    const { id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones } = req.body;
    try {
      const response = await IntegranteService.createIntegranteEquipo(
        id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones
      );
      if (response.error) {
        // Llamamos el integrante para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el integrante para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el integrante para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Actualizar una integrante
  static updatintegrante = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase integrante
      const integrante = await IntegranteService.updatintegrante(id, campos);
      // Validamos si no se pudo actualizar la integrante
      if (integrante.error) {
        ResponseProvider.error(
          res,
          integrante.message,
          integrante.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        integrante.data,
        integrante.message,
        integrante.code
      );
    } catch (error) {
      // Llamamos el integrante para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar una integrante
  static deleteintegrante = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la integrante
      const response = await IntegranteService.deleteintegrante(id);
      if (response.error) {
        // Llamamos el integrante para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el integrante para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el integrante para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default IntegranteController;