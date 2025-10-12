import { ResponseProvider } from "../providers/ResponseProvider.js";
import subparcelasService from "../services/subparcelasService.js";

class SubparcelasController {

  // Obtener todos los Subparcelas
  static getAllSubparcelas = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las Subparcelas
      const response = await Subparcelaservice.getSubparcelas();   
      // Validamos si no hay Subparcelas
      if (response.error) {        
        // Llamamos el conglomerado para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el conglomerado para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
       }
    } catch (error) {
      // Llamamos el conglomerado para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener una categoría por su ID
  static getSubparcelasById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la categoría por su ID
      const response = await Subparcelaservice.getSubparcelasById(id);
      if (response.error) {
        // Llamamos el conglomerado para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el conglomerado para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el conglomerado para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

}
export default SubparcelasController;
