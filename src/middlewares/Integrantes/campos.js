export const campos = [
  { name: "id_integrante", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_equipo", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_empleado", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_cargo", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "fecha_inicio", required: true},
  { name: "fecha_fin", required: true },
  { name: "observaciones", required: false, minLength: 1, maxLength: 200 }

];
