export const campos = [
  { name: "id_asignacion", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_equipo", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_conglomerado", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "fecha_asignacion", required: true},
  { name: "fecha_finalizacion", required: true },
  { name: "estado", required: true, minLength: 1, maxLength: 11 },
  { name: "observaciones", required: false, minLength: 1, maxLength: 200 }

];
