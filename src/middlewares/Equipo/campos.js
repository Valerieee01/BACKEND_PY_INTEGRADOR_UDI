export const campos = [
  { name: "id_equipo", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "nombre_equipo", required: true, minLength: 1, maxLength: 100 },
  { name: "institucion", required: true, minLength: 1, maxLength: 100 },
  { name: "estado", required: true,  minLength: 1, maxLength: 11 },
  { name: "observacion", required: false, minLength: 1, maxLength: 200 },
  { name: "fecha_creacion", required: true },

];
