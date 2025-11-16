import connection from "../utils/db.js";

class Equipo {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM Equipos");
      return rows;
    } catch (error) {
      console.log(error);

      throw new Error("Error al obtener los Equipos");
    }
  }

  // Método para buscar un equipo por id
  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT nombre_equipo, institucion, estado, observaciones, fecha_creacion FROM Equipos WHERE id_equipo = ?",
        [id]
      );
      if (rows.length === 0) {
        return []; // retornar un array vacío 
      }
      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que id_equipo es único
    } catch (error) {
      console.error("Error al obtener el equipo por ID:", error); 
      throw new Error("Error al obtener el equipo.");
    }
  }

  // Método para crear  un equipo
  async create(nombre_equipo, institucion,estado,observaciones) {
    try {

      const [result] = await connection.query(
        "INSERT INTO equipos (nombre_equipo, institucion, estado, observaciones) VALUES (?,?,?,?)",
        [nombre_equipo, institucion,estado, observaciones]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear EL equipo
      }
      // Retorna el nueva equipo creado
      return { id: result.insertId, nombre_equipo,  };
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la equipo");
    }
  }

  async update(id, campos) {
    try {
      let query = "UPDATE equipos SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el equipo por su ID
      query += " WHERE id_equipo = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar la equipo");
    }
  }

  // Método para eliminar una equipo
  async delete(id_equipo) {
    const [result] = await connection.query(
      "DELETE FROM equipos WHERE id_equipo = ?",
      [id_equipo]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el equipo, ocurrio un error inesperado.",
      };

    }

    return {
      error: false,
      mensaje: "equipo eliminado exitosamente.",
    };
  }

}

export default Equipo;