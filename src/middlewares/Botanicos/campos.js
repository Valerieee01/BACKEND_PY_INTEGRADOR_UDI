export const campos = [
  { name: "id_muestreo_botanico", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_subparcela", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "fecha_muestreo", required: true },
  { name: "observaciones", required: false, minLength: 1, maxLength: 11 }

];
