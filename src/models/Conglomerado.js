import connection from "../utils/db.js";

class Conglomerado {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT p.id_persona, p.nombre_completo_razon_social, p.id_tipo_identificacion, p.numero_identificacion, p.correo, p.telefono, p.estado " +
        "FROM personas p JOIN Conglomerados e ON e.id_Conglomerado = p.id_persona");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los Conglomerados");
    }
  }

  async getById(id) {
    try {

      const [rows] = await connection.query(
        "SELECT p.id_persona, p.nombre_completo_razon_social, p.id_tipo_identificacion, p.numero_identificacion, p.correo, p.telefono, p.estado " +
        "FROM personas p JOIN Conglomerados e ON e.id_Conglomerado = p.id_persona " +
        "WHERE e.id_Conglomerado = ?",
        [id]
      );

      if (rows.length === 0) {
        return []; // retornar un array vacío si prefieres que la ausencia de resultados sea un array vacío
      }

      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que id_cliente es único
    } catch (error) {
      console.error("Error al obtener el Conglomerado por ID:", error); // Usa console.error para errores
      throw new Error("Error al obtener el Conglomerado.");
    }
  }



}

export default Conglomerado;
