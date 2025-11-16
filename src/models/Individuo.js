import connection from "../utils/db.js";

class Individuo {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM individuo");
      return rows;
    } catch (error) {
      console.log(error);

      throw new Error("Error al obtener las individuos");
    }
  }

  // Método para buscar un individuo por id
  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones"+
        "WHERE c.id_individuo = ?",
        [id]
      );
      if (rows.length === 0) {
        return []; // retornar un array vacío 
      }
      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que id_individuo es único
    } catch (error) {
      console.error("Error al obtener el individuo por ID:", error); 
      throw new Error("Error al obtener el individuo.");
    }
  }

  // Método para crear  un individuo
  async create(id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones) {
    try {

      const [result] = await connection.query(
        "INSERT INTO individuos (id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones)"
       + " VALUES (?,?,?,?,?,?,?,?,?,?)",
        [id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear EL individuo
      }
      // Retorna el nueva individuo creado
      return { id: result.insertId, id_persona };
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la individuo");
    }
  }

  async update(id, campos) {
    try {
      let query = "UPDATE individuos SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el individuo por su ID
      query += " WHERE id_individuo = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar los individuo");
    }
  }

  // Método para eliminar una individuo
  async delete(id_individuo) {
    const [result] = await connection.query(
      "DELETE FROM individuos WHERE id_individuo = ?",
      [id_individuo]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el individuo, ocurrio un error inesperado.",
      };

    }

    return {
      error: false,
      mensaje: "individuo eliminado exitosamente.",
    };
  }

}

export default Individuo;