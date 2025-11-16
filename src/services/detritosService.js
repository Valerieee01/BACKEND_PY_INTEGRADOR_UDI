import MuestreoDetritosMadera from "../models/MuestreoDetMadera.js";

class DetritosService { 

  static async getMuestreoDetritos()
  { 
    try {
      const detritosInstance = new MuestreoDetritosMadera();
      const detritos = await detritosInstance.getAll();
      // Validamos si no hay detritos      
      if (detritos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay detritos registrados",
        };
      }      
      // Retornamos las detritos obtenidas
      return {
        error: false,
        code: 200,
        message: "detritos obtenidos correctamente",
        data: detritos,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las detritos",
      };
    }
  }

  static async getMuestreoDetritosById(id) {
    try {
      const detritosInstance = new MuestreoDetritosMadera();
      const detritos = await detritosInstance.getById(id);
      console.log(detritos);
      
      // Validamos si no hay detritoss
      if (detritos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "detritoss no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "detritos obtenido correctamente",
        data: detritos,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener el detritos",
      };
    }
  }

  static async createMuestreoDetritos(id_persona) {
    try {
      const detritosInstance = new MuestreoDetritosMadera();
      const detritos = await detritosInstance.create(id_persona);
      // Validamos si no se pudo crear la categoría      
      if (detritos === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear los detritos",
        };
      }   
      // Retornamos la nueva detritos creada
      return {
        error: false,
        code: 201,
        message: "detritos creada correctamente",
        data: detritos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la detritos, verifica si la persona existe o si ya es un detritos",
      };
    }
  }

  static async updateMuestreoDetritos(id, campos) { 
    try {
      const detritosInstance = new MuestreoDetritosMadera();
      // Consultamos la detritos por id
      const detritosExistente = await detritosInstance.getById(id);
      // Validamos si no existe la detritos
      if (detritosExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "detritos no encontrada",
        };
      }
      const detritos = await detritosInstance.update(id, campos); 
      // Validamos si no se pudo actualizar la detritos
      if (detritos === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la detritos",
        };
      }      
      // Retornamos la detritos actualizada
      return {
        error: false,
        code: 200,
        message: "detritos actualizada correctamente",
        data: detritos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la detritos",
      };
    } 
  }

  static async deleteaMuestreoDetritos(id) { 
    try {
      const detritosInstance = new MuestreoDetritosMadera();
      // Consultamos el detritos por id
      const detritosExistente = await detritosInstance.getById(id);
      // Validamos si no existe el detritos
      if (detritosExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "detritos no encontrada",
        };
      }
   
      // Procedemos a eliminar el detritos      
      const resultado = await detritosInstance.delete(id); 
      // Validamos si no se pudo eliminar el detritos
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
        message: "detrito eliminado correctamente",
        data: detritosExistente,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el detrito",
      };
    }
  }

}

export default DetritosService;