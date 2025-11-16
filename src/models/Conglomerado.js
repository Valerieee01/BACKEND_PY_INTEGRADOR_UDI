import connection from "../utils/db.js";

class Conglomerado {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM conglomerado");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los Conglomerados");
    }
  }

  async getById(id) {
    try {

      const [rows] = await connection.query(
        "SELECT codigo, latitud, longitud, fecha, observaciones " +
        "WHERE e.id_conglomerado = ?",
        [id]
      );

      if (rows.length === 0) {
        return []; // retornar un array vacío 
      }

      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que id_conglomerado es único
    } catch (error) {
      console.error("Error al obtener el Conglomerado por ID:", error); 
      throw new Error("Error al obtener el Conglomerado.");
    }
  }



}

export default Conglomerado;
