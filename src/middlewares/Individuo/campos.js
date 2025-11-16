export const campos = [
  { name: "id_individuo", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_muestreo_botanico", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "numero", required: true, type: "number", minLength: 1, maxLength: 6},
  { name: "especie", required: true, minLength: 1, maxLength: 100 },
  { name: "dap", required: true, type: "number", minLength: 1, maxLength: 7 },
  { name: "altura_total", required: true, type: "number", minLength: 1, maxLength: 7 },
  { name: "azium", required: true, type: "number", minLength: 1, maxLength: 7 },
  { name: "distancia", required: true,type: "number", minLength: 1, maxLength: 7},
  { name: "estado", required: true, minLength: 1, maxLength: 50 },
  { name: "categoria_dap", required: true, minLength: 1, maxLength: 50 },
  { name: "observaciones", required: false, minLength: 1, maxLength: 200 },
];
