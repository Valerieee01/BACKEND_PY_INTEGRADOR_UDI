import connection from "../utils/db.js";

class Empleado {

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT  p.numero_identificacion, p.nombre_completo_razon_social, p.correo c.nombre_cargo"
        + " FROM personas p JOIN empleados e ON c.id_empleado = p.id_persona "
      + "JOIN cargos c ON E.id_cargo_empleado = c.id_cargo");
      return rows;
    } catch (error) {
      console.log(error);

      throw new Error("Error al obtener los empleados");
    }
  }

  // Método para buscar un empleado por id
  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT  p.numero_identificacion, p.nombre_completo_razon_social, p.correo c.nombre_cargo"
        +" FROM personas p JOIN empleados e ON c.id_empleado = p.id_persona "
      + "JOIN cargos c ON E.id_cargo_empleado = c.id_cargo" +
        "WHERE p.numero_identificacion = ?",
        [id]
      );
      if (rows.length === 0) {
        return []; // retornar un array vacío si prefieres que la ausencia de resultados sea un array vacío
      }
      return rows[0]; // Retorna el primer (y único) resultado encontrado, asumiendo que numero_identificacion es único
    } catch (error) {
      console.error("Error al obtener el cliente por ID:", error); 
      throw new Error("Error al obtener el cliente.");
    }
  }

  // Método para crear una nueva categoría
  async create(id_empleado, id_cargo_empleado) {
    try {


      const [result] = await connection.query(
        "INSERT INTO empleados (id_empleado, id_cargo_empleado) VALUES (?,?)",
        [id_empleado, id_cargo_empleado]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear la empleado
      }
      // Retorna la nueva empleado creado
      return { id: result.insertId, id_empleado };
    } catch (error) {
      console.log(error);

      throw new Error("Error al crear el empleado");
    }
  }

  async update(id, campos) {
    try {
      let query = "UPDATE empleados SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id_empleado = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar la empleado");
    }
  }

  // Método para eliminar una Persona
  async delete(id_empleado) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM empleados WHERE id_empleado = ?",
      [id_empleado]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar la empleado, ocurrio un error inesperado.",
      };
    }

    return {
      error: false,
      mensaje: "empleado eliminado exitosamente.",
    };
  }

}

export default Empleado;