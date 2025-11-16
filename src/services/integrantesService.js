import IntegrantesEquipo from "../models/IntegrantesEquipo.js";

class IntegranteService { 

  static async getIntegrantesEquipo()
  { 
    try {
      const integrantesInstance = new IntegrantesEquipo();
      const integrantess = await integrantesInstance.getAll();
      // Validamos si no hay integrantess      
      if (integrantess.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay integrantess registrados",
        };
      }      
      // Retornamos las integrantess obtenidas
      return {
        error: false,
        code: 200,
        message: "integrantess obtenidos correctamente",
        data: integrantess,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las integrantess",
      };
    }
  }

  static async getIntegrantesEquipoById(id) {
    try {
      const integranteInstance = new IntegrantesEquipo();
      const integrantes = await integranteInstance.getById(id);
      // Validamos si no hay integrantes
      if (integrantes.length === 0) {
        return {
          error: true,
          code: 404,
          message: "integrantes no encontrada",
        };
      }

      return {
        error: false,
        code: 200,
        message: "integrante obtenido correctamente",
        data: integrantes,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error al obtener la integrante",
      };
    }
  }

  static async createIntegranteEquipo() {
    try {
      const integrantesInstance = new IntegrantesEquipo();
      const integrantess = await integrantesInstance.create();
      // Validamos si no se pudo crear la categoría      
      if (integrantess === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la integrantes",
        };
      }   
      // Retornamos la nueva integrantes creada
      return {
        error: false,
        code: 201,
        message: "integrantes creada correctamente",
        data: integrantess,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la integrantes, verifica si ya existe",
      };
    }
  }

  static async updateIntegrantesEquipo(id, campos) { 
    const EquipoInstance = new IntegrantesEquipo();
    try {
      // Consultamos la Equipo por id
      const EquipoExistente = await EquipoInstance.getById(id);
      // Validamos si no existe la Equipo
      if (EquipoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Equipo no encontrada",
        };
      }
      const Equipo = await EquipoInstance.update(id, campos); 
      // Validamos si no se pudo actualizar la Equipo
      if (Equipo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la Equipo",
        };
      }      
      // Retornamos la Equipo actualizada
      return {
        error: false,
        code: 200,
        message: "Equipo actualizada correctamente",
        data: Equipo,
      };
    } catch (error) {   
      console.log(error);
         
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la Equipo",
      };
    } 
  }

  static async deleteIntegrantesEquipo(id) { 
    try {
      const integranteInstance = new Integrantesintegrante();
      // Consultamos el integrante por id
      const integranteExistente = await integranteInstance.getById(id);
      // Validamos si no existe el integrante
      if (integranteExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "integrante no encontrada",
        };
      }
   
      // Procedemos a eliminar el integrante      
      const resultado = await integranteInstance.delete(id); 
      // Validamos si no se pudo eliminar el integrante
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
        message: "integrante eliminado correctamente",
        data: integranteExistente,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el integrante, verifica si tiene mantenimientos asociados",
      };
    }
  }

}

export default IntegranteService;
