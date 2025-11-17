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


   static async createIndividuo(id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones) {
    try {
      const IndividuoInstance = new Individuo();
      const Individuos = await IndividuoInstance.create(id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones);
      // Validamos si no se pudo crear la categoría      
      if (Individuos === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la Individuo",
        };
      }   
      // Retornamos la nueva Individuo creada
      return {
        error: false,
        code: 201,
        message: "Individuo creada correctamente",
        data: Individuos,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la Individuo, verifica si ya existe",
      };
    }
  }

  static async updateIndividuo(id, campos) { 
    const IndividuoInstance = new Individuo();
    try {
      // Consultamos la Individuo por id
      const IndividuoExistente = await IndividuoInstance.getById(id);
      // Validamos si no existe la Individuo
      if (IndividuoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Individuo no encontrada",
        };
      }
      const Individuo = await IndividuoInstance.update(id, campos); 
      // Validamos si no se pudo actualizar la Individuo
      if (Individuo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la Individuo",
        };
      }      
      // Retornamos la Individuo actualizada
      return {
        error: false,
        code: 200,
        message: "Individuo actualizada correctamente",
        data: Individuo,
      };
    } catch (error) {   
      console.log(error);
         
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la Individuo",
      };
    } 
  }

  static async deleteIndividuo(id) { 
    try {
      const IndividuoInstance = new Individuo();
      // Consultamos el Individuo por id
      const IndividuoExistente = await IndividuoInstance.getById(id);
      // Validamos si no existe el Individuo
      if (IndividuoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Individuo no encontrada",
        };
      }
   
      // Procedemos a eliminar el Individuo      
      const resultado = await IndividuoInstance.delete(id); 
      // Validamos si no se pudo eliminar el Individuo
      if (resultado.error) {
        return {
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }      
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Individuo eliminado correctamente",
        data: IndividuoExistente,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el Individuo, verifica si tiene mantenimientos asociados",
      };
    }
  }

}

export default IndividuoService;
