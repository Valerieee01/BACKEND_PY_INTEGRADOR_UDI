import AsignacionesEquipo from "../models/AsignacionesEquipo.js";

class AsignacionesService { 

  static async getAsignaciones()
  { 
    try {
      const asignacionesInstance = new AsignacionesEquipo();
      const asignacioness = await asignacionesInstance.getAll();
      // Validamos si no hay asignacioness      
      if (asignacioness.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay asignacioness registrados",
        };
      }      
      // Retornamos las asignacioness obtenidas
      return {
        error: false,
        code: 200,
        message: "asignacioness obtenidos correctamente",
        data: asignacioness,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las asignacioness",
      };
    }
  }

  static async getAsinacionesById(id) {
    try {
      const AsinacionesInstance = new AsignacionesEquipo();
      const Asinaciones = await AsinacionesInstance.getById(id);
      console.log(Asinaciones);
      
      // Validamos si no hay Asinacioness
      if (Asinaciones.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Asinacioness no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Asinaciones obtenido correctamente",
        data: Asinaciones,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener el Asinaciones",
      };
    }
  }

  static async createAsignaciones(id_persona) {
    try {
      const asignacionesInstance = new AsignacionesEquipo();
      const asignaciones = await asignacionesInstance.create(id_persona);
      // Validamos si no se pudo crear la categoría      
      if (asignaciones === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la asignaciones",
        };
      }   
      // Retornamos la nueva asignaciones creada
      return {
        error: false,
        code: 201,
        message: "asignaciones creada correctamente",
        data: asignaciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la asignaciones, verifica si la persona existe o si ya es un asignaciones",
      };
    }
  }

  static async updateAsignaciones(id, campos) { 
    try {
      const asignacionesInstance = new AsignacionesEquipo();
      // Consultamos la asignaciones por id
      const asignacionesExistente = await asignacionesInstance.getById(id);
      // Validamos si no existe la asignaciones
      if (asignacionesExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "asignaciones no encontrada",
        };
      }
      const asignaciones = await asignacionesInstance.update(id, campos); 
      // Validamos si no se pudo actualizar la asignaciones
      if (asignaciones === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la asignaciones",
        };
      }      
      // Retornamos la asignaciones actualizada
      return {
        error: false,
        code: 200,
        message: "asignaciones actualizada correctamente",
        data: asignaciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la asignaciones",
      };
    } 
  }

  static async deleteasignaciones(id) { 
    try {
      const asignacionesInstance = new AsignacionesEquipo();
      // Consultamos el asignaciones por id
      const asignacionesExistente = await asignacionesInstance.getById(id);
      // Validamos si no existe el asignaciones
      if (asignacionesExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "asignaciones no encontrada",
        };
      }
   
      // Procedemos a eliminar el asignaciones      
      const resultado = await asignacionesInstance.delete(id); 
      // Validamos si no se pudo eliminar el asignaciones
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
        message: "asignaciones eliminado correctamente",
        data: asignacionesExistente,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el asignaciones",
      };
    }
  }

}

export default AsignacionesService;