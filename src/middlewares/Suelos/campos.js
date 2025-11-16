export const campos = [
  { name: "id_muestreo_suelo", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "id_subparcela", required: true, type: "number", minLength: 1, maxLength: 6 },
  { name: "profundidad_inicial", required: true, type: "number", minLength: 1, maxLength: 11 },
  { name: "profundidad_final", required: true, type: "number", minLength: 1, maxLength: 11 },
  { name: "textura", required: true, minLength: 1, maxLength: 50  },
  { name: "color_munsell", required: true, minLength: 1, maxLength: 50 },
  { name: "humedad", required: true, minLength: 1, maxLength: 50 },
  { name: "tipo_muestra", required: true, minLength: 1, maxLength: 50 },
  { name: "observaciones", required: false, minLength: 1, maxLength: 200 }
];
