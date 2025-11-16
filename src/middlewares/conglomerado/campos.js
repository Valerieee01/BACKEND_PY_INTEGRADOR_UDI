export const campos = [
  { name: "id_conglomerado", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "codigo", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "latutud", required: true, type: "number", minLength: 1, maxLength: 10 },
  { name: "longitud", required: true, type: "number", minLength: 1, maxLength: 10},
  { name: "altitud", required: true, type: "number", minLength: 1, maxLength: 7 },
  { name: "fecha", required: true },
  { name: "observaciones", required: false, minLength: 1, maxLength: 11 }

];
