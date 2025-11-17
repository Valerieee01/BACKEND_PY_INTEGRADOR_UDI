import MuestreoBotanico from "../models/MuestreoBotanico.js";

class BotanicoService { 

  static async getMuestreoBotanico()
  { 
    try {
      const botanicoInstance = new MuestreoBotanico();
      const botanicos = await botanicoInstance.getAll();
      // Validamos si no hay botanicos      
      if (botanicos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay botanicos registrados",
        };
      }      
      // Retornamos las botanicos obtenidas
      return {
        error: false,
        code: 200,
        message: "botanicos obtenidos correctamente",
        data: botanicos,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las botanicos",
      };
    }
  }

  static async getMuestreoBotanicoById(id) {
    try {
      const botanicoInstance = new MuestreoBotanico();
      const botanicos = await botanicoInstance.getById(id);
      // Validamos si no hay botanicos
      if (botanicos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "botanicos no encontrada",
        };
      }

      return {
        error: false,
        code: 200,
        message: "botanico obtenido correctamente",
        data: botanicos,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error al obtener la botanico",
      };
    }
  }

   static async createMuestreoBotanico(id_subparcela, fecha_muestreo, observaciones) {
    try {
      const botanicoInstance = new MuestreoBotanico();
      const botanico = await botanicoInstance.create(id_subparcela, fecha_muestreo, observaciones);
      // Validamos si no se pudo crear la categoría      
      if (botanico === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear los botanico",
        };
      }   
      // Retornamos la nueva botanico creada
      return {
        error: false,
        code: 201,
        message: "botanico creada correctamente",
        data: botanico,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la botanico, verifica si la persona existe o si ya es un botanico",
      };
    }
  }

   static async updateMuestreoBotanico(id, campos) { 
    try {
      const botanicoInstance = new MuestreoBotanico();
      // Consultamos la botanico por id
      const botanicoExistente = await botanicoInstance.getById(id);
      // Validamos si no existe la botanico
      if (botanicoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "botanico no encontrada",
        };
      }
      const botanico = await botanicoInstance.update(id, campos); 
      // Validamos si no se pudo actualizar la botanico
      if (botanico === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la botanico",
        };
      }      
      // Retornamos la botanico actualizada
      return {
        error: false,
        code: 200,
        message: "botanico actualizada correctamente",
        data: botanico,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la botanico",
      };
    } 
  }

  static async deleteMuestreoBotanico(id) { 
    try {
      const botanicoInstance = new MuestreoBotanico();
      // Consultamos el botanico por id
      const botanicoExistente = await botanicoInstance.getById(id);
      // Validamos si no existe el botanico
      if (botanicoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "botanico no encontrada",
        };
      }
   
      // Procedemos a eliminar el botanico      
      const resultado = await botanicoInstance.delete(id); 
      // Validamos si no se pudo eliminar el botanico
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
        message: "botanico eliminado correctamente",
        data: botanicoExistente,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el botanico",
      };
    }
  }


}

export default BotanicoService;
