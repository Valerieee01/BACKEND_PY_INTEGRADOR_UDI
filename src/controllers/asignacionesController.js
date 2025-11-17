import { ResponseProvider } from "../providers/ResponseProvider.js";
import AsignacionesService from "../services/asignacionesService.js";

class AsignacionesController {

  // Obtener todos las asignaciones
  static getAllAsignaciones = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las Asignaciones
      const response = await AsignacionesService.getAsignaciones();   
      // Validamos si no hay Asignaciones
      if (response.error) {        
        // Llamamos el  asignaciones equipo para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el  asignaciones equipo para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el  asignaciones equipo para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una asignaciones por su ID
  static getAsignacionesById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la asignaciones por su ID
      const response = await AsignacionesService.deleteAsignaciones(id);
      if (response.error) {
        // Llamamos el muestreo Asignaciones para centralizar los mensajes de respuesta
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
  static createAsignaciones = async (req, res) => {
    const { id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones } = req.body;
    try {
      const response = await AsignacionesService.createMuestreoasignaciones(
        id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones
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

  // Actualizar una asignaciones
  static updateAsignaciones = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Categoria
      const asignaciones = await AsignacionesService.updateAsignaciones(id, campos);
      // Validamos si no se pudo actualizar la asignaciones
      if (asignaciones.error) {
        ResponseProvider.error(
          res,
          asignaciones.message,
          asignaciones.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        asignaciones.data,
        asignaciones.message,
        asignaciones.code
      );
    } catch (error) {
      // Llamamos el muestreo detrito para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar una muestreo detrito
  static deleteAsignaciones = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la muestreo Asignaciones
      const response = await AsignacionesService.deleteAsignaciones(id);
      if (response.error) {
        // Llamamos el muestreo Asignaciones para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el muestreo Asignaciones para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el muestreo Asignaciones para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default AsignacionesController;
