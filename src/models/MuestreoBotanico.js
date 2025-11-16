import connection from "../utils/db.js";

class MuestreoBotanico {
    
    async getAll() {
        try {
            const [rows] = await connection.query("SELECT sp.numero_subparcela, mb.fecha_muestreo, mb.observaciones FROM muestreo_botanico mb" +
               "JOIN subparcela sp ON sp.id_subparcela = mb.id_subparcela");
            return rows; 
        } catch (error) {
            throw new Error("Error al obtener las categorías");
        }
    }
    
    async getById(id) {
      try {
        const [rows] = await connection.query( "SELECT sp.numero_subparcela, mb.fecha_muestreo, mb.observaciones FROM muestreo_botanico mb" +
               "JOIN subparcela sp ON sp.id_subparcela = mb.id_subparcela" +
               "WHERE mb.id_muestreo_botanico = ? ",[id]);
        console.log(rows);
        
        if (rows.length === 0) {
          return []; // Retorna un array vacío si no se encuentra la persona
        }
        return rows[0];
      } catch (error) {
                  throw new Error("Error al obtener el muestreo botanico");
        }
    }

    // Método para crear una nueva categoría
  async create(id_subparcela, fecha_muestreo, observaciones) {
    
    try {
      const [result] = await connection.query(
        "INSERT INTO muestreo_botanico (id_subparcela, fecha_muestreo, observaciones) VALUES (?, ?, ?)",
        [id_subparcela, fecha_muestreo, observaciones]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear la persona
      }
      // Retorna la nueva persona creada
      return { id: result.insertId, id_subparcela, fecha_muestreo, observaciones};

    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la persona");
    }
  }

   async update(id, campos) {
    try {
      let query = "UPDATE muestreo_botanico SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id_muestreo_botanico = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar el muestreo_botanico");
    }
  }

   // Método para eliminar una Persona
  async delete(personaId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM muestreo_botanico WHERE id_muestreo_botanico = ?",
      [personaId]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el muestreo botanico, ocurrio un error inesperado.",
      };
    }

    return {
      error: false,
      mensaje: "Muestreo Botanico eliminada exitosamente.",
    };
  }

}

export default MuestreoBotanico;