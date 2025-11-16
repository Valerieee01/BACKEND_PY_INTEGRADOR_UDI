import connection from "../utils/db.js";

class IntegrantesEquipo {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM integrantes_equipo");
      return rows;
    } catch (error) {
      console.log(error);

      throw new Error("Error al obtener los integrantes");
    }
  }

  // Método para buscar un los integrantes por id
  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM integrantes_equipo WHERE id_integrante = ?",
        [id]
      );
      if (rows.length === 0) {
        return []; // retornar un array vacío 
      }
      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que id_Asignaciones de equipos es único
    } catch (error) {
      console.error("Error al obtener el los integrantes por ID:", error); 
      throw new Error("Error al obtener el los integrantes.");
    }
  }

  // Método para crear  un los integrantes
  async create(id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones) {
    try {

      const [result] = await connection.query(
        "INSERT INTO integrantes_equipo (id_equipo, id_empleado, id_cargo, fecha_inicio, fecha_fin, observaciones)" +
        " VALUES (?,?,?,?,?,?)",
        [id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear EL los integrantes
      }
      // Retorna el nueva los integrantes creado
      return { id: result.insertId, id_persona };
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la los integrantes");
    }
  }

  async update(id, campos) {
    try {
      let query = "UPDATE integrantes_equipo SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el los integrantes por su ID
      query += " WHERE id_integrante = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar la los integrantes");
    }
  }

  // Método para eliminar una los integrantes
  async delete(id) {
    const [result] = await connection.query(
      "DELETE FROM integrantes_equipo WHERE id_integrante = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el los integrantes, ocurrio un error inesperado.",
      };

    }

    return {
      error: false,
      mensaje: "los integrantes eliminado exitosamente.",
    };
  }

}

export default IntegrantesEquipo;