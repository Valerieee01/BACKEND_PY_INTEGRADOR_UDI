import { ResponseProvider } from "../providers/ResponseProvider.js";
import IndividuoService from "../services/individuoService.js";

class IndividuoController {

  // Obtener todos los individuos
  static getAllIndividuos = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las individuos
      const response = await IndividuoService.getIndividuos();   
      // Validamos si no hay individuos
      if (response.error) {        
        // Llamamos el Individuos para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el Individuos para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el Individuos para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una individuos por su ID
  static getIndividuosById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la individuos por su ID
      const response = await IndividuoService.getIndividuoById(id);
      if (response.error) {
        // Llamamos el Individuos para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el Individuos para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el Individuos para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Crear una nueva Individuos
  static createIndividuos = async (req, res) => {
    const { id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones } = req.body;
    try {
      const response = await IndividuoService.createIndividuo(
        id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones
      );
      if (response.error) {
        // Llamamos el individuos para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el individuos para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el individuos para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Actualizar una individuos
  static updateIndividuo = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Individuo
      const individuos = await IndividuoService.updateIndividuo(id, campos);
      // Validamos si no se pudo actualizar la individuos
      if (individuos.error) {
        ResponseProvider.error(
          res,
          individuos.message,
          individuos.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        individuos.data,
        individuos.message,
        individuos.code
      );
    } catch (error) {
      // Llamamos el Individuos para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar una Individuos
  static deleteIndividuo = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la Individuos
      const response = await IndividuoService.deleteIndividuo(id);
      if (response.error) {
        // Llamamos el Individuos para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el Individuos para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el Individuos para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default IndividuoController;