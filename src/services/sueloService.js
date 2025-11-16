import MuestreoSuelo from "../models/MuestreoSuelo.js";

class SueloService { 

  static async getMuestreoSuelo()
  { 
    try {
      const sueloInstance = new MuestreoSuelo();
      const suelos = await sueloInstance.getAll();
      // Validamos si no hay suelos      
      if (suelos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay suelos registrados",
        };
      }      
      // Retornamos las suelos obtenidas
      return {
        error: false,
        code: 200,
        message: "suelos obtenidos correctamente",
        data: suelos,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las suelos",
      };
    }
  }

  static async getMuestreosueloById(id) {
    try {
      const sueloInstance = new MuestreoSuelo();
      const suelo = await sueloInstance.getById(id);
      console.log(suelo);
      
      // Validamos si no hay suelos
      if (suelo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "suelos no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "suelo obtenido correctamente",
        data: suelo,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener el suelo",
      };
    }
  }

  static async createMuestreoSuelo(id_persona) {
    try {
      const sueloInstance = new MuestreoSuelo();
      const suelo = await sueloInstance.create(id_persona);
      // Validamos si no se pudo crear el muestreo      
      if (suelo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear los suelo",
        };
      }   
      // Retornamos el nuevo suelo creada
      return {
        error: false,
        code: 201,
        message: "suelo creada correctamente",
        data: suelo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la suelo, verifica si ya existe",
      };
    }
  }

  static async updateMuestreoSuelo(id, campos) { 
    try {
      const sueloInstance = new MuestreoSuelo();
      // Consultamos la suelo por id
      const sueloExistente = await sueloInstance.getById(id);
      // Validamos si no existe la suelo
      if (sueloExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "suelo no encontrada",
        };
      }
      const suelo = await sueloInstance.update(id, campos); 
      // Validamos si no se pudo actualizar la suelo
      if (suelo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la suelo",
        };
      }      
      // Retornamos la suelo actualizada
      return {
        error: false,
        code: 200,
        message: "suelo actualizada correctamente",
        data: suelo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la suelo",
      };
    } 
  }

  static async deleteaMuestreoSuelo(id) { 
    try {
      const sueloInstance = new MuestreoSuelo();
      // Consultamos el suelo por id
      const sueloExistente = await sueloInstance.getById(id);
      // Validamos si no existe el suelo
      if (sueloExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "suelo no encontrada",
        };
      }
   
      // Procedemos a eliminar el suelo      
      const resultado = await sueloInstance.delete(id); 
      // Validamos si no se pudo eliminar el suelo
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
        data: sueloExistente,
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

export default SueloService;