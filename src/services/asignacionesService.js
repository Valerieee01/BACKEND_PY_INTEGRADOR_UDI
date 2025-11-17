import AsignacionesEquipo from "../models/AsignacionesEquipo.js";

class AsignacionesService { 

  static async getAsignaciones()
  { 
    try {
      const asignacionesInstance = new AsignacionesEquipo();
      const asignaciones = await asignacionesInstance.getAll();
      // Validamos si no hay asignaciones      
      if (asignaciones.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay asignaciones registrados",
        };
      }      
      // Retornamos las asignaciones obtenidas
      return {
        error: false,
        code: 200,
        message: "asignaciones obtenidos correctamente",
        data: asignaciones,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las asignaciones",
      };
    }
  }

  static async getAsignacionesById(id) {
    try {
      const AsignacionesInstance = new AsignacionesEquipo();
      const Asignaciones = await AsignacionesInstance.getById(id);
      console.log(Asignaciones);
      
      // Validamos si no hay Asignacioness
      if (Asignaciones.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Asignacioness no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Asignaciones obtenido correctamente",
        data: Asignaciones,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener el Asignaciones",
      };
    }
  }

  static async createAsignaciones(id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones) {
    try {
      const asignacionesInstance = new AsignacionesEquipo();
      const asignaciones = await asignacionesInstance.create(id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones);
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

  static async deleteAsignaciones(id) { 
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