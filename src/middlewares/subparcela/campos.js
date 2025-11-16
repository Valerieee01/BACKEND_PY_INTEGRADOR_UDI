export const campos = [
  { name: "id_subparcela", required: true, type: "number", minLength: 1, maxLength: 11 },
  { name: "id_conglomerado", required: true, type: "number", minLength: 1, maxLength: 11 },
  { name: "numero_subparcela", required: true, type: "number", minLength: 1, maxLength: 11 },
  { name: "coordenada_relativa", required: true,  minLength: 1, maxLength: 50 },
  { name: "pendiente", required: true, type: "number", minLength: 1, maxLength: 100},
  { name: "tipo_cobertura", required: true, minLength: 1, maxLength: 11 },
  { name: "observaciones", required: true, minLength: 1, maxLength: 200 }
];
