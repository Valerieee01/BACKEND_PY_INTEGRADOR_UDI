import { ResponseProvider } from "../providers/ResponseProvider.js";
import ConglomeradoService from "../services/conglomeradoService.js";

class ConglomeradosController {

  // Obtener todos los Conglomerados
  static getAllConglomerados = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las Conglomerados
      const response = await ConglomeradoService.getConglomerados();   
      // Validamos si no hay Conglomerados
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
  static getConglomeradosById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la categoría por su ID
      const response = await ConglomeradoService.getConglomeradosById(id);
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
export default ConglomeradosController;
