import connection from "../utils/db.js";

class AsignacionesEquipo {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM asignaciones_equipos");
      return rows;
    } catch (error) {
      console.log(error);

      throw new Error("Error al obtener las clientes");
    }
  }
  // Método para buscar un Asignaciones de equipos por id

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM asignaciones_equipos WHERE id_asignacion = ?",
        [id]
      );
      if (rows.length === 0) {
        return []; // retornar un array vacío si prefieres que la ausencia de resultados sea un array vacío
      }
      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que id_Asignaciones de equipos es único
    } catch (error) {
      console.error("Error al obtener el Asignaciones de equipos por ID:", error); // Usa console.error para errores
      throw new Error("Error al obtener el Asignaciones de equipos.");
    }
  }

  // Método para crear  un Asignaciones de equipos
  async create(id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones) {
    try {

      const [result] = await connection.query(
        "INSERT INTO asignaciones_equipos (id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones) VALUES (?,?,?,?,?,?)",
        [id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear EL Asignaciones de equipos
      }
      // Retorna el nueva Asignaciones de equipos creado
      return { id: result.insertId, id_persona };
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la Asignaciones de equipos");
    }
  }

  async update(id, campos) {
    try {
      let query = "UPDATE asignaciones_equipos SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el Asignaciones de equipos por su ID
      query += " WHERE id_asignacion = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar la Asignaciones de equipos");
    }
  }

  // Método para eliminar una Asignaciones de equipos
  async delete(id) {
    const [result] = await connection.query(
      "DELETE FROM asignaciones_equipos WHERE asignaciones_equipos = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el Asignaciones de equipos, ocurrio un error inesperado.",
      };

    }

    return {
      error: false,
      mensaje: "Asignaciones de equipos eliminado exitosamente.",
    };
  }

}

export default AsignacionesEquipo;