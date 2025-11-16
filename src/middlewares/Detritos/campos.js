export const campos = [
  { name: "id_muestreo_detritos", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_subparcela", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "tipo_elemento", required: true,  minLength: 1, maxLength: 50 },
  { name: "diametro", required: true, type: "number", minLength: 1, maxLength: 7 },
  { name: "longitud", required: true, type: "number", minLength: 1, maxLength: 7 },
  { name: "estado_descomposicion", required: true },
  { name: "posicion", required: true, minLength: 1, maxLength: 30},
  { name: "observaciones", required: false, minLength: 1, maxLength: 200 }

];
