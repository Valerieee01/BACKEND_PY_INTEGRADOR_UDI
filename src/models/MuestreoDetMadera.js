import connection from "../utils/db.js";

class MuestreoDetritosMadera {
    
    async getAll() {
        try {
            const [rows] = await connection.query("SELECT sp.numero_subparcela, dm.tipo_elemento, dm.diametro, dm.longitud, "+
              " dm.estado_descomposicion, dm.posicion, dm.observaciones FROM muestreo_detritos_madera dm" +
               "JOIN subparcela sp ON sp.id_subparcela = dm.id_subparcela");
            return rows; 
        } catch (error) {
            throw new Error("Error al obtener las categorías");
        }
    }
    
    async getById(id) {
      try {
        const [rows] = await connection.query( "SELECT sp.numero_subparcela, dm.tipo_elemento, dm.diametro, dm.longitud, "+
              " dm.estado_descomposicion, dm.posicion, dm.observaciones FROM muestreo_detritos_madera dm" +
               "JOIN subparcela sp ON sp.id_subparcela = dm.id_subparcela" +
               "WHERE dm.id_muestreo_detritos = ? ",[id]);
        console.log(rows);
        
        if (rows.length === 0) {
          return []; // Retorna un array vacío si no se encuentra la persona
        }
        return rows[0];
      } catch (error) {
                  throw new Error("Error al obtener el Muestreo de Detritos de madera");
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
      throw new Error("Error al crear el Muestreo de Detritos de madera");
    }
  }

   async update(id, campos) {
    try {
      let query = "UPDATE muestreo_detritos_madera SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id_muestreo_detritos = ?";
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
      "DELETE FROM muestreo_detritos_madera WHERE id_muestreo_detritos = ?",
      [personaId]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar el muestreo de detritos de madera, ocurrio un error inesperado.",
      };
    }

    return {
      error: false,
      mensaje: "Muestreo detritos de madera eliminada exitosamente.",
    };
  }

}

export default MuestreoDetritosMadera;