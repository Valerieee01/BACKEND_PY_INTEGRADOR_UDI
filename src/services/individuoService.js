import Individuo from "../models/Individuo.js";

class IndividuoService { 

  static async getIndividuos()
  { 
    try {
      const individuoInstance = new Individuo();
      const individuos = await individuoInstance.getAll();
      // Validamos si no hay individuos      
      if (individuos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay individuos registrados",
        };
      }      
      // Retornamos las individuos obtenidas
      return {
        error: false,
        code: 200,
        message: "individuos obtenidos correctamente",
        data: individuos,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las individuos",
      };
    }
  }

  static async getIndividuoById(id) {
    try {
      const individuoInstance = new Individuo();
      const individuos = await individuoInstance.getById(id);
      // Validamos si no hay individuos
      if (individuos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "individuos no encontrada",
        };
      }

      return {
        error: false,
        code: 200,
        message: "individuo obtenido correctamente",
        data: individuos,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error al obtener la individuo",
      };
    }
  }


}

export default IndividuoService;
