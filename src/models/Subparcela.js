import connection from "../utils/db.js";

class Subparcela {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM subparcela");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los Subparcelas");
    }
  }

  async getById(id) {
    try {

      const [rows] = await connection.query(
        "SELECT id_subparcela, numero_subparcela, coordenada_relativa, pendiente, tipo_cobertura, observaciones" +
        "FROM subparcela " +
        "WHERE e.id_subparcela = ?",
        [id]
      );

      if (rows.length === 0) {
        return []; // retornar un array vacío si prefieres que la ausencia de resultados sea un array vacío
      }

      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que id_cliente es único
    } catch (error) {
      console.error("Error al obtener el Subparcela por ID:", error); // Usa console.error para errores
      throw new Error("Error al obtener el Subparcela.");
    }
  }



}

export default Subparcela;
