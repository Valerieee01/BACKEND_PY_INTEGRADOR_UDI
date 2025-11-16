import Subparcela from "../models/Subparcela.js";

class SubparcelaService { 

  static async getSubparcelas()
  { 
    try {
      const subparcelaInstance = new Subparcela();
      const subparcelas = await subparcelaInstance.getAll();
      // Validamos si no hay subparcelas      
      if (subparcelas.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay subparcelas registrados",
        };
      }      
      // Retornamos las subparcelas obtenidas
      return {
        error: false,
        code: 200,
        message: "subparcelas obtenidos correctamente",
        data: subparcelas,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las subparcelas",
      };
    }
  }

  static async getSubparcelaById(id) {
    try {
      const subparcelaInstance = new Subparcela();
      const subparcelas = await subparcelaInstance.getById(id);
      // Validamos si no hay subparcelas
      if (subparcelas.length === 0) {
        return {
          error: true,
          code: 404,
          message: "subparcelas no encontrada",
        };
      }

      return {
        error: false,
        code: 200,
        message: "subparcela obtenido correctamente",
        data: subparcelas,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error al obtener la subparcela",
      };
    }
  }


}

export default SubparcelaService;
