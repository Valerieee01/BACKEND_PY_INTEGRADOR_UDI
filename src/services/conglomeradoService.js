import Conglomerado from "../models/conglomerado.js";

class ConglomeradoService { 

  static async getConglomerados()
  { 
    try {
      const conglomeradoInstance = new Conglomerado();
      const conglomerados = await conglomeradoInstance.getAll();
      // Validamos si no hay conglomerados      
      if (conglomerados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay conglomerados registrados",
        };
      }      
      // Retornamos las conglomerados obtenidas
      return {
        error: false,
        code: 200,
        message: "conglomerados obtenidos correctamente",
        data: conglomerados,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las conglomerados",
      };
    }
  }

  static async getConglomeradoById(id) {
    try {
      const conglomeradoInstance = new Conglomerado();
      const conglomerados = await conglomeradoInstance.getById(id);
      // Validamos si no hay conglomerados
      if (conglomerados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "conglomerados no encontrada",
        };
      }

      return {
        error: false,
        code: 200,
        message: "conglomerado obtenido correctamente",
        data: conglomerados,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error al obtener la conglomerado",
      };
    }
  }


}

export default ConglomeradoService;
